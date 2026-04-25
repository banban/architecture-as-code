/**
 * Shared customer data governance model for the CSP event-driven architecture.
 *
 * Purpose:
 * - capture ownership, sensitivity, protection, and partner-access policy
 * - separate governance concerns from application and integration mechanics
 * - provide a stakeholder-friendly artifact for architecture, security, and privacy discussions
 */
import {
  BoundedContext,
  type ISODateTime,
  type UUID,
} from "./event-contracts.js";

export type AttributeGroup =
  | "CoreIdentity"
  | "RelationshipData"
  | "BillingData"
  | "ServiceData"
  | "ContactData"
  | "AddressData";

export interface DataOwnershipRule {
  attributeGroup: AttributeGroup;
  authoritativeSystem: BoundedContext;
  downstreamConsumers: Array<BoundedContext | string>;
}

export const customerOwnershipRules: readonly DataOwnershipRule[] = [
  {
    attributeGroup: "CoreIdentity",
    authoritativeSystem: BoundedContext.FrontOffice,
    downstreamConsumers: [BoundedContext.FinanceBilling, BoundedContext.ServiceDelivery],
  },
  {
    attributeGroup: "RelationshipData",
    authoritativeSystem: BoundedContext.FrontOffice,
    downstreamConsumers: [BoundedContext.FinanceBilling, BoundedContext.ServiceDelivery],
  },
  {
    attributeGroup: "ContactData",
    authoritativeSystem: BoundedContext.FrontOffice,
    downstreamConsumers: [BoundedContext.FinanceBilling, BoundedContext.ServiceDelivery],
  },
  {
    attributeGroup: "AddressData",
    authoritativeSystem: BoundedContext.FrontOffice,
    downstreamConsumers: [BoundedContext.FinanceBilling, BoundedContext.ServiceDelivery],
  },
  {
    attributeGroup: "BillingData",
    authoritativeSystem: BoundedContext.FinanceBilling,
    downstreamConsumers: [BoundedContext.FrontOffice, BoundedContext.ServiceDelivery],
  },
  {
    attributeGroup: "ServiceData",
    authoritativeSystem: BoundedContext.ServiceDelivery,
    downstreamConsumers: [BoundedContext.FrontOffice, BoundedContext.FinanceBilling],
  },
] as const;

export type DataSensitivity =
  | "Public"
  | "Internal"
  | "PII"
  | "SensitiveHealth"
  | "Restricted";

export interface DataClassificationRule {
  dataDomain:
    | "CustomerIdentity"
    | "ContactData"
    | "AddressData"
    | "BillingData"
    | "ServiceData"
    | "ClinicalOrMedicalData"
    | "RegulatoryData";
  sensitivity: DataSensitivity;
  encryptedAtRest: boolean;
  encryptedInTransit: boolean;
  tokenizationRecommended: boolean;
  fieldLevelEncryptionRecommended: boolean;
}

export interface DataProtectionPolicy {
  segregationOfSensitiveDataRequired: boolean;
  separateSensitiveStoresPreferred: boolean;
  encryptionKeyIsolationRequired: boolean;
  classifications: DataClassificationRule[];
}

export const cspDataProtectionPolicy: DataProtectionPolicy = {
  segregationOfSensitiveDataRequired: true,
  separateSensitiveStoresPreferred: true,
  encryptionKeyIsolationRequired: true,
  classifications: [
    {
      dataDomain: "CustomerIdentity",
      sensitivity: "PII",
      encryptedAtRest: true,
      encryptedInTransit: true,
      tokenizationRecommended: true,
      fieldLevelEncryptionRecommended: false,
    },
    {
      dataDomain: "ContactData",
      sensitivity: "PII",
      encryptedAtRest: true,
      encryptedInTransit: true,
      tokenizationRecommended: true,
      fieldLevelEncryptionRecommended: false,
    },
    {
      dataDomain: "AddressData",
      sensitivity: "PII",
      encryptedAtRest: true,
      encryptedInTransit: true,
      tokenizationRecommended: false,
      fieldLevelEncryptionRecommended: false,
    },
    {
      dataDomain: "BillingData",
      sensitivity: "Restricted",
      encryptedAtRest: true,
      encryptedInTransit: true,
      tokenizationRecommended: true,
      fieldLevelEncryptionRecommended: true,
    },
    {
      dataDomain: "ServiceData",
      sensitivity: "Internal",
      encryptedAtRest: true,
      encryptedInTransit: true,
      tokenizationRecommended: false,
      fieldLevelEncryptionRecommended: false,
    },
    {
      dataDomain: "ClinicalOrMedicalData",
      sensitivity: "SensitiveHealth",
      encryptedAtRest: true,
      encryptedInTransit: true,
      tokenizationRecommended: true,
      fieldLevelEncryptionRecommended: true,
    },
    {
      dataDomain: "RegulatoryData",
      sensitivity: "Restricted",
      encryptedAtRest: true,
      encryptedInTransit: true,
      tokenizationRecommended: false,
      fieldLevelEncryptionRecommended: true,
    },
  ],
};

export type ExternalPartnerType =
  | "GovernmentRegulator"
  | "EmergencyService"
  | "VolunteerOrganisation"
  | "NonProfitPartner";

export interface ExternalPartnerAccessPolicy {
  partnerType: ExternalPartnerType;
  permittedDataClassifications: DataSensitivity[];
  consentRequired: boolean;
  legalBasisRequired: boolean;
  auditRequired: true;
}

export const externalPartnerAccessPolicies: readonly ExternalPartnerAccessPolicy[] = [
  {
    partnerType: "GovernmentRegulator",
    permittedDataClassifications: ["Internal", "PII", "Restricted"],
    consentRequired: false,
    legalBasisRequired: true,
    auditRequired: true,
  },
  {
    partnerType: "EmergencyService",
    permittedDataClassifications: ["Internal", "PII", "SensitiveHealth"],
    consentRequired: false,
    legalBasisRequired: true,
    auditRequired: true,
  },
  {
    partnerType: "VolunteerOrganisation",
    permittedDataClassifications: ["Internal"],
    consentRequired: true,
    legalBasisRequired: true,
    auditRequired: true,
  },
  {
    partnerType: "NonProfitPartner",
    permittedDataClassifications: ["Internal", "PII"],
    consentRequired: true,
    legalBasisRequired: true,
    auditRequired: true,
  },
] as const;

export type CustomerAttributePath = string;

export interface SharedAttributeUpdatePolicy {
  attributePath: CustomerAttributePath;
  attributeGroup: AttributeGroup;
  primaryAuthority: BoundedContext;
  allowedWriters: BoundedContext[];
  conflictResolution:
    | "PrimaryAuthorityWins"
    | "NewestTimestampWins"
    | "ManualReview";
  suppressRepublishToOrigin: boolean;
  suppressWhenValueUnchanged: boolean;
  requireNewerTimestampThanLastApplied: boolean;
}

/**
 * These policies are only needed when a solution intentionally allows
 * collaborative updates for selected customer attributes. They do not replace
 * the default ownership model; they define the exception rules for attributes
 * that may be touched by more than one bounded context.
 */
export const sharedCustomerAttributeUpdatePolicies: readonly SharedAttributeUpdatePolicy[] = [
  {
    attributePath: "displayName",
    attributeGroup: "CoreIdentity",
    primaryAuthority: BoundedContext.FrontOffice,
    allowedWriters: [BoundedContext.FrontOffice, BoundedContext.FinanceBilling],
    conflictResolution: "PrimaryAuthorityWins",
    suppressRepublishToOrigin: true,
    suppressWhenValueUnchanged: true,
    requireNewerTimestampThanLastApplied: true,
  },
  {
    attributePath: "contacts.mobilePhone",
    attributeGroup: "ContactData",
    primaryAuthority: BoundedContext.FrontOffice,
    allowedWriters: [BoundedContext.FrontOffice, BoundedContext.ServiceDelivery],
    conflictResolution: "NewestTimestampWins",
    suppressRepublishToOrigin: true,
    suppressWhenValueUnchanged: true,
    requireNewerTimestampThanLastApplied: true,
  },
  {
    attributePath: "addresses.serviceAddress",
    attributeGroup: "AddressData",
    primaryAuthority: BoundedContext.FrontOffice,
    allowedWriters: [BoundedContext.FrontOffice, BoundedContext.ServiceDelivery],
    conflictResolution: "ManualReview",
    suppressRepublishToOrigin: true,
    suppressWhenValueUnchanged: true,
    requireNewerTimestampThanLastApplied: true,
  },
] as const;

export interface AttributeLineageSnapshot {
  attributePath: CustomerAttributePath;
  lastAppliedAt?: ISODateTime;
  lastAppliedBy?: BoundedContext | string;
  lastCorrelationId?: UUID;
  lastSourceEventId?: UUID;
  lastValueFingerprint?: string;
}

export interface AttributeChangeCandidate {
  attributePath: CustomerAttributePath;
  attributeGroup: AttributeGroup;
  value: unknown;
  lastUpdatedAt: ISODateTime;
}

export interface PingPongGuardInput {
  receivingContext: BoundedContext | string;
  proposedPublishingContext: BoundedContext | string;
  sourceContext: BoundedContext | string;
  eventId: UUID;
  correlationId?: UUID;
  causationId?: UUID;
  changedAttributes: AttributeChangeCandidate[];
  knownLineage: AttributeLineageSnapshot[];
  sharedAttributePolicies?: readonly SharedAttributeUpdatePolicy[];
}

export type PingPongDecisionReason =
  | "allowed_primary_authority"
  | "allowed_shared_writer"
  | "blocked_not_authoritative_writer"
  | "blocked_writer_not_in_shared_policy"
  | "blocked_republish_to_origin"
  | "blocked_same_value_same_correlation"
  | "blocked_stale_timestamp"
  | "blocked_primary_authority_conflict"
  | "manual_review_required";

export interface AttributePingPongDecision {
  attributePath: CustomerAttributePath;
  action: "AllowPublish" | "SuppressPublish" | "EscalateForReview";
  reason: PingPongDecisionReason;
  authoritativeContext: BoundedContext;
  currentWriter: BoundedContext | string;
}

export interface PingPongGuardDecision {
  shouldPublish: boolean;
  decisions: AttributePingPongDecision[];
}

function findOwnershipRule(attributeGroup: AttributeGroup): DataOwnershipRule | undefined {
  return customerOwnershipRules.find((rule) => rule.attributeGroup === attributeGroup);
}

function findSharedAttributePolicy(
  attributePath: CustomerAttributePath,
  policies: readonly SharedAttributeUpdatePolicy[],
): SharedAttributeUpdatePolicy | undefined {
  return policies.find((policy) => policy.attributePath === attributePath);
}

function fingerprintValue(value: unknown): string {
  return stableSerialize(value);
}

function stableSerialize(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => stableSerialize(item)).join(",")}]`;
  }

  const entries = Object.entries(value as Record<string, unknown>)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, nestedValue]) => `"${key}":${stableSerialize(nestedValue)}`);

  return `{${entries.join(",")}}`;
}

/**
 * Prevents attribute updates from bouncing endlessly between systems.
 *
 * Core rules:
 * - if an attribute has a single authority, only that authority may republish it
 * - shared-write attributes must be explicitly listed in governance policy
 * - consumers should suppress republishing to the original source when no
 *   semantically newer change exists
 * - the same correlation + same value fingerprint should not be republished
 * - stale updates must not displace a newer applied value
 */
export function evaluatePingPongRisk(
  input: PingPongGuardInput,
): PingPongGuardDecision {
  const policies = input.sharedAttributePolicies ?? sharedCustomerAttributeUpdatePolicies;

  const decisions = input.changedAttributes.map((candidate) => {
    const ownershipRule = findOwnershipRule(candidate.attributeGroup);

    if (!ownershipRule) {
      return {
        attributePath: candidate.attributePath,
        action: "EscalateForReview",
        reason: "manual_review_required",
        authoritativeContext: BoundedContext.FrontOffice,
        currentWriter: input.proposedPublishingContext,
      } satisfies AttributePingPongDecision;
    }

    const sharedPolicy = findSharedAttributePolicy(candidate.attributePath, policies);
    const lineage = input.knownLineage.find(
      (snapshot) => snapshot.attributePath === candidate.attributePath,
    );
    const currentFingerprint = fingerprintValue(candidate.value);
    const authoritativeContext = sharedPolicy?.primaryAuthority
      ?? ownershipRule.authoritativeSystem;

    if (!sharedPolicy) {
      if (input.proposedPublishingContext !== ownershipRule.authoritativeSystem) {
        return {
          attributePath: candidate.attributePath,
          action: "SuppressPublish",
          reason: "blocked_not_authoritative_writer",
          authoritativeContext,
          currentWriter: input.proposedPublishingContext,
        } satisfies AttributePingPongDecision;
      }

      return {
        attributePath: candidate.attributePath,
        action: "AllowPublish",
        reason: "allowed_primary_authority",
        authoritativeContext,
        currentWriter: input.proposedPublishingContext,
      } satisfies AttributePingPongDecision;
    }

    if (!sharedPolicy.allowedWriters.includes(input.proposedPublishingContext as BoundedContext)) {
      return {
        attributePath: candidate.attributePath,
        action: "SuppressPublish",
        reason: "blocked_writer_not_in_shared_policy",
        authoritativeContext,
        currentWriter: input.proposedPublishingContext,
      } satisfies AttributePingPongDecision;
    }

    if (
      sharedPolicy.suppressRepublishToOrigin
      && input.sourceContext === input.proposedPublishingContext
    ) {
      return {
        attributePath: candidate.attributePath,
        action: "SuppressPublish",
        reason: "blocked_republish_to_origin",
        authoritativeContext,
        currentWriter: input.proposedPublishingContext,
      } satisfies AttributePingPongDecision;
    }

    if (
      sharedPolicy.suppressWhenValueUnchanged
      && lineage !== undefined
      && lineage?.lastCorrelationId === input.correlationId
      && lineage.lastValueFingerprint === currentFingerprint
    ) {
      return {
        attributePath: candidate.attributePath,
        action: "SuppressPublish",
        reason: "blocked_same_value_same_correlation",
        authoritativeContext,
        currentWriter: input.proposedPublishingContext,
      } satisfies AttributePingPongDecision;
    }

    if (
      sharedPolicy.requireNewerTimestampThanLastApplied
      && lineage?.lastAppliedAt !== undefined
      && candidate.lastUpdatedAt <= lineage.lastAppliedAt
    ) {
      return {
        attributePath: candidate.attributePath,
        action: "SuppressPublish",
        reason: "blocked_stale_timestamp",
        authoritativeContext,
        currentWriter: input.proposedPublishingContext,
      } satisfies AttributePingPongDecision;
    }

    if (
      sharedPolicy.conflictResolution === "PrimaryAuthorityWins"
      && input.proposedPublishingContext !== sharedPolicy.primaryAuthority
      && lineage?.lastAppliedBy === sharedPolicy.primaryAuthority
    ) {
      return {
        attributePath: candidate.attributePath,
        action: "SuppressPublish",
        reason: "blocked_primary_authority_conflict",
        authoritativeContext,
        currentWriter: input.proposedPublishingContext,
      } satisfies AttributePingPongDecision;
    }

    if (sharedPolicy.conflictResolution === "ManualReview") {
      return {
        attributePath: candidate.attributePath,
        action: "EscalateForReview",
        reason: "manual_review_required",
        authoritativeContext,
        currentWriter: input.proposedPublishingContext,
      } satisfies AttributePingPongDecision;
    }

    return {
      attributePath: candidate.attributePath,
      action: "AllowPublish",
      reason: sharedPolicy.primaryAuthority === input.proposedPublishingContext
        ? "allowed_primary_authority"
        : "allowed_shared_writer",
      authoritativeContext,
      currentWriter: input.proposedPublishingContext,
    } satisfies AttributePingPongDecision;
  });

  return {
    shouldPublish: decisions.every((decision) => decision.action === "AllowPublish"),
    decisions,
  };
}
