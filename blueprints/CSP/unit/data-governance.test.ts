import { assert, describe, it } from 'vitest';
import {
  cspDataProtectionPolicy,
  customerOwnershipRules,
  evaluatePingPongRisk,
  externalPartnerAccessPolicies,
  sharedCustomerAttributeUpdatePolicies,
  type AttributeGroup,
  type PingPongGuardInput,
} from '../src/data-governance.ts';
import { BoundedContext } from '../src/event-contracts.ts';

describe('Data Governance', () => {
  describe('customerOwnershipRules', () => {
    it('should have correct ownership rules', () => {
      assert.strictEqual(customerOwnershipRules.length, 6);

      const coreIdentityRule = customerOwnershipRules.find(
        (rule) => rule.attributeGroup === 'CoreIdentity'
      );
      assert.strictEqual(coreIdentityRule?.authoritativeSystem, BoundedContext.FrontOffice);
      assert.deepStrictEqual(coreIdentityRule?.downstreamConsumers, [
        BoundedContext.FinanceBilling,
        BoundedContext.ServiceDelivery,
      ]);

      const billingRule = customerOwnershipRules.find(
        (rule) => rule.attributeGroup === 'BillingData'
      );
      assert.strictEqual(billingRule?.authoritativeSystem, BoundedContext.FinanceBilling);
    });
  });

  describe('cspDataProtectionPolicy', () => {
    it('should have required segregation and encryption', () => {
      assert.strictEqual(cspDataProtectionPolicy.segregationOfSensitiveDataRequired, true);
      assert.strictEqual(cspDataProtectionPolicy.separateSensitiveStoresPreferred, true);
      assert.strictEqual(cspDataProtectionPolicy.encryptionKeyIsolationRequired, true);
    });

    it('should have classifications for all data domains', () => {
      assert.strictEqual(cspDataProtectionPolicy.classifications.length, 7);

      const piiClassification = cspDataProtectionPolicy.classifications.find(
        (c) => c.dataDomain === 'CustomerIdentity'
      );
      assert.strictEqual(piiClassification?.sensitivity, 'PII');
      assert.strictEqual(piiClassification?.encryptedAtRest, true);
      assert.strictEqual(piiClassification?.encryptedInTransit, true);
      assert.strictEqual(piiClassification?.tokenizationRecommended, true);
    });
  });

  describe('externalPartnerAccessPolicies', () => {
    it('should have policies for all partner types', () => {
      assert.strictEqual(externalPartnerAccessPolicies.length, 4);
    });

    it('should require audit for all partners', () => {
      externalPartnerAccessPolicies.forEach((policy) => {
        assert.strictEqual(policy.auditRequired, true);
      });
    });

    it('should have appropriate access levels', () => {
      const governmentPolicy = externalPartnerAccessPolicies.find(
        (p) => p.partnerType === 'GovernmentRegulator'
      );
      assert.deepStrictEqual(governmentPolicy?.permittedDataClassifications, [
        'Internal',
        'PII',
        'Restricted',
      ]);
      assert.strictEqual(governmentPolicy?.consentRequired, false);
      assert.strictEqual(governmentPolicy?.legalBasisRequired, true);
    });
  });

  describe('sharedCustomerAttributeUpdatePolicies', () => {
    it('should have policies for shared attributes', () => {
      assert.strictEqual(sharedCustomerAttributeUpdatePolicies.length, 3);
    });

    it('should have correct policy for displayName', () => {
      const displayNamePolicy = sharedCustomerAttributeUpdatePolicies.find(
        (p) => p.attributePath === 'displayName'
      );
      assert.ok(displayNamePolicy);
      assert.strictEqual(displayNamePolicy.primaryAuthority, BoundedContext.FrontOffice);
      assert.deepStrictEqual(displayNamePolicy.allowedWriters, [
        BoundedContext.FrontOffice,
        BoundedContext.FinanceBilling,
      ]);
      assert.strictEqual(displayNamePolicy.conflictResolution, 'PrimaryAuthorityWins');
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

    const getDecision = (result: { decisions?: { action: string; reason: string }[] }) => {
      assert.ok(result.decisions);
      assert.ok(result.decisions.length > 0);
      return result.decisions[0]!;
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
      assert.strictEqual(result.shouldPublish, true);
      const decision = getDecision(result);
      assert.strictEqual(decision.action, 'AllowPublish');
      assert.strictEqual(decision.reason, 'allowed_primary_authority');
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
      assert.strictEqual(result.shouldPublish, false);
      const decision = getDecision(result);
      assert.strictEqual(decision.action, 'SuppressPublish');
      assert.strictEqual(decision.reason, 'blocked_not_authoritative_writer');
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
      assert.strictEqual(result.shouldPublish, true);
      const decision = getDecision(result);
      assert.strictEqual(decision.action, 'AllowPublish');
      assert.strictEqual(decision.reason, 'allowed_shared_writer');
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
      assert.strictEqual(result.shouldPublish, false);
      const decision = getDecision(result);
      assert.strictEqual(decision.action, 'SuppressPublish');
      assert.strictEqual(decision.reason, 'blocked_republish_to_origin');
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
      assert.strictEqual(result.shouldPublish, false);
      const decision = getDecision(result);
      assert.strictEqual(decision.action, 'SuppressPublish');
      assert.strictEqual(decision.reason, 'blocked_stale_timestamp');
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
      assert.strictEqual(result.shouldPublish, false);
      const decision = getDecision(result);
      assert.strictEqual(decision.action, 'EscalateForReview');
      assert.strictEqual(decision.reason, 'manual_review_required');
    });

    it('should escalate when no ownership rule found', () => {
      const input: PingPongGuardInput = {
        ...baseInput,
        changedAttributes: [
          {
            attributePath: 'unknown.attribute',
            attributeGroup: 'Unknown' as unknown as AttributeGroup,
            value: 'value',
            lastUpdatedAt: '2023-01-01T00:00:00Z',
          },
        ],
      };

      const result = evaluatePingPongRisk(input);
      assert.strictEqual(result.shouldPublish, false);
      const decision = getDecision(result);
      assert.strictEqual(decision.action, 'EscalateForReview');
      assert.strictEqual(decision.reason, 'manual_review_required');
    });
  });
});