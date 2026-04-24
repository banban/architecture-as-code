/**
 * Shared customer data governance model for the CSP event-driven architecture.
 *
 * Purpose:
 * - capture ownership, sensitivity, protection, and partner-access policy
 * - separate governance concerns from application and integration mechanics
 * - provide a stakeholder-friendly artifact for architecture, security, and privacy discussions
 */
import { BoundedContext } from "./event-contracts.js";

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
