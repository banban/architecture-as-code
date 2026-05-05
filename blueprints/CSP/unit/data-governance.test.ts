import { describe, expect, it } from 'vitest';
import {
    cspDataProtectionPolicy,
    customerOwnershipRules,
    evaluatePingPongRisk,
    externalPartnerAccessPolicies,
    sharedCustomerAttributeUpdatePolicies,
    type PingPongGuardInput,
} from '../data-governance.js';
import { BoundedContext } from '../event-contracts.js';

describe('Data Governance', () => {
  describe('customerOwnershipRules', () => {
    it('should have correct ownership rules', () => {
      expect(customerOwnershipRules).toHaveLength(6);

      const coreIdentityRule = customerOwnershipRules.find(
        (rule) => rule.attributeGroup === 'CoreIdentity'
      );
      expect(coreIdentityRule?.authoritativeSystem).toBe(BoundedContext.FrontOffice);
      expect(coreIdentityRule?.downstreamConsumers).toEqual([
        BoundedContext.FinanceBilling,
        BoundedContext.ServiceDelivery,
      ]);

      const billingRule = customerOwnershipRules.find(
        (rule) => rule.attributeGroup === 'BillingData'
      );
      expect(billingRule?.authoritativeSystem).toBe(BoundedContext.FinanceBilling);
    });
  });

  describe('cspDataProtectionPolicy', () => {
    it('should have required segregation and encryption', () => {
      expect(cspDataProtectionPolicy.segregationOfSensitiveDataRequired).toBe(true);
      expect(cspDataProtectionPolicy.separateSensitiveStoresPreferred).toBe(true);
      expect(cspDataProtectionPolicy.encryptionKeyIsolationRequired).toBe(true);
    });

    it('should have classifications for all data domains', () => {
      expect(cspDataProtectionPolicy.classifications).toHaveLength(7);

      const piiClassification = cspDataProtectionPolicy.classifications.find(
        (c) => c.dataDomain === 'CustomerIdentity'
      );
      expect(piiClassification?.sensitivity).toBe('PII');
      expect(piiClassification?.encryptedAtRest).toBe(true);
      expect(piiClassification?.encryptedInTransit).toBe(true);
      expect(piiClassification?.tokenizationRecommended).toBe(true);
    });
  });

  describe('externalPartnerAccessPolicies', () => {
    it('should have policies for all partner types', () => {
      expect(externalPartnerAccessPolicies).toHaveLength(4);
    });

    it('should require audit for all partners', () => {
      externalPartnerAccessPolicies.forEach((policy) => {
        expect(policy.auditRequired).toBe(true);
      });
    });

    it('should have appropriate access levels', () => {
      const governmentPolicy = externalPartnerAccessPolicies.find(
        (p) => p.partnerType === 'GovernmentRegulator'
      );
      expect(governmentPolicy?.permittedDataClassifications).toEqual([
        'Internal',
        'PII',
        'Restricted',
      ]);
      expect(governmentPolicy?.consentRequired).toBe(false);
      expect(governmentPolicy?.legalBasisRequired).toBe(true);
    });
  });

  describe('sharedCustomerAttributeUpdatePolicies', () => {
    it('should have policies for shared attributes', () => {
      expect(sharedCustomerAttributeUpdatePolicies).toHaveLength(3);
    });

    it('should have correct policy for displayName', () => {
      const displayNamePolicy = sharedCustomerAttributeUpdatePolicies.find(
        (p) => p.attributePath === 'displayName'
      );
      expect(displayNamePolicy?.primaryAuthority).toBe(BoundedContext.FrontOffice);
      expect(displayNamePolicy?.allowedWriters).toEqual([
        BoundedContext.FrontOffice,
        BoundedContext.FinanceBilling,
      ]);
      expect(displayNamePolicy?.conflictResolution).toBe('PrimaryAuthorityWins');
    });
  });

  describe('evaluatePingPongRisk', () => {
    const baseInput: PingPongGuardInput = {
      receivingContext: BoundedContext.FrontOffice,
      proposedPublishingContext: BoundedContext.FrontOffice,
      sourceContext: BoundedContext.FinanceBilling,
      eventId: 'test-event-id',
      correlationId: 'test-correlation-id',
      changedAttributes: [],
      knownLineage: [],
    };

    it('should allow publish for primary authority', () => {
      const input: PingPongGuardInput = {
        ...baseInput,
        changedAttributes: [
          {
            attributePath: 'customer.status',
            attributeGroup: 'CoreIdentity',
            value: 'Active',
            lastUpdatedAt: '2023-01-01T00:00:00Z',
          },
        ],
      };

      const result = evaluatePingPongRisk(input);
      expect(result.shouldPublish).toBe(true);
      expect(result.decisions[0].action).toBe('AllowPublish');
      expect(result.decisions[0].reason).toBe('allowed_primary_authority');
    });

    it('should suppress publish for non-authoritative writer', () => {
      const input: PingPongGuardInput = {
        ...baseInput,
        proposedPublishingContext: BoundedContext.ServiceDelivery,
        changedAttributes: [
          {
            attributePath: 'billing.accountId',
            attributeGroup: 'BillingData',
            value: '123',
            lastUpdatedAt: '2023-01-01T00:00:00Z',
          },
        ],
      };

      const result = evaluatePingPongRisk(input);
      expect(result.shouldPublish).toBe(false);
      expect(result.decisions[0].action).toBe('SuppressPublish');
      expect(result.decisions[0].reason).toBe('blocked_not_authoritative_writer');
    });

    it('should allow shared writer for shared attributes', () => {
      const input: PingPongGuardInput = {
        ...baseInput,
        proposedPublishingContext: BoundedContext.FinanceBilling,
        sourceContext: BoundedContext.FrontOffice,
        changedAttributes: [
          {
            attributePath: 'displayName',
            attributeGroup: 'CoreIdentity',
            value: 'New Name',
            lastUpdatedAt: '2023-01-01T00:00:00Z',
          },
        ],
      };

      const result = evaluatePingPongRisk(input);
      expect(result.shouldPublish).toBe(true);
      expect(result.decisions[0].action).toBe('AllowPublish');
      expect(result.decisions[0].reason).toBe('allowed_shared_writer');
    });

    it('should suppress republish to origin', () => {
      const input: PingPongGuardInput = {
        ...baseInput,
        proposedPublishingContext: BoundedContext.FrontOffice,
        sourceContext: BoundedContext.FrontOffice,
        changedAttributes: [
          {
            attributePath: 'displayName',
            attributeGroup: 'CoreIdentity',
            value: 'New Name',
            lastUpdatedAt: '2023-01-01T00:00:00Z',
          },
        ],
      };

      const result = evaluatePingPongRisk(input);
      expect(result.shouldPublish).toBe(false);
      expect(result.decisions[0].action).toBe('SuppressPublish');
      expect(result.decisions[0].reason).toBe('blocked_republish_to_origin');
    });

    it('should suppress stale timestamp', () => {
      const input: PingPongGuardInput = {
        ...baseInput,
        proposedPublishingContext: BoundedContext.FinanceBilling,
        sourceContext: BoundedContext.FrontOffice,
        changedAttributes: [
          {
            attributePath: 'displayName',
            attributeGroup: 'CoreIdentity',
            value: 'New Value',
            lastUpdatedAt: '2023-01-01T00:00:00Z',
          },
        ],
        knownLineage: [
          {
            attributePath: 'displayName',
            lastAppliedAt: '2023-01-02T00:00:00Z',
          },
        ],
      };

      const result = evaluatePingPongRisk(input);
      expect(result.shouldPublish).toBe(false);
      expect(result.decisions[0].action).toBe('SuppressPublish');
      expect(result.decisions[0].reason).toBe('blocked_stale_timestamp');
    });

    it('should escalate for manual review conflict resolution', () => {
      const input: PingPongGuardInput = {
        ...baseInput,
        proposedPublishingContext: BoundedContext.ServiceDelivery,
        changedAttributes: [
          {
            attributePath: 'addresses.serviceAddress',
            attributeGroup: 'AddressData',
            value: 'New Address',
            lastUpdatedAt: '2023-01-01T00:00:00Z',
          },
        ],
      };

      const result = evaluatePingPongRisk(input);
      expect(result.shouldPublish).toBe(false);
      expect(result.decisions[0].action).toBe('EscalateForReview');
      expect(result.decisions[0].reason).toBe('manual_review_required');
    });

    it('should escalate when no ownership rule found', () => {
      const input: PingPongGuardInput = {
        ...baseInput,
        changedAttributes: [
          {
            attributePath: 'unknown.attribute',
            attributeGroup: 'Unknown' as any,
            value: 'value',
            lastUpdatedAt: '2023-01-01T00:00:00Z',
          },
        ],
      };

      const result = evaluatePingPongRisk(input);
      expect(result.shouldPublish).toBe(false);
      expect(result.decisions[0].action).toBe('EscalateForReview');
      expect(result.decisions[0].reason).toBe('manual_review_required');
    });
  });
});