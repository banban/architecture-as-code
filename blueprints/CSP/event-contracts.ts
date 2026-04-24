/**
 * Shared customer event contracts for the CSP event-driven architecture.
 *
 * Purpose:
 * - provide a single neutral source of truth for canonical customer events
 * - support enterprise, application, and partner-facing architecture views
 * - remain implementation-agnostic and vendor-neutral
 */

export type UUID = string;
export type ISODateTime = string;

export const CUSTOMER_TOPIC_NAME = "customer-topic" as const;

export enum BoundedContext {
  FrontOffice = "FrontOffice",
  FinanceBilling = "FinanceBilling",
  ServiceDelivery = "ServiceDelivery",
  FutureSolution = "FutureSolution",
}

export interface ExternalReference {
  system: BoundedContext | string;
  localId: string;
  referenceType: "Customer" | "Account" | "BillingAccount" | "ServiceAccount";
}

export interface CustomerIdentity {
  customerId: UUID;
  externalReferences: ExternalReference[];
}

export type CustomerLifecycleStatus =
  | "Prospect"
  | "Active"
  | "Suspended"
  | "Closed";

export interface ContactMethod {
  type: "Email" | "Phone" | "Mobile";
  value: string;
  preferred?: boolean;
}

export interface PostalAddress {
  purpose: "Primary" | "Billing" | "Service";
  line1: string;
  line2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  countryCode: string;
}

export interface CustomerSegmentation {
  segment?: string;
  stakeholderType?: string;
  relationshipManagerId?: string;
}

export interface BillingProfile {
  billingAccountId?: string;
  billingStatus?: "Pending" | "Active" | "OnHold" | "Closed";
  paymentTerms?: string;
}

export interface ServiceProfile {
  serviceAccountId?: string;
  serviceStatus?: "Pending" | "Provisioned" | "Active" | "Suspended" | "Closed";
  serviceLocations?: string[];
}

export interface CustomerProfile {
  identity: CustomerIdentity;
  personOrOrganisation: "Person" | "Organisation";
  displayName: string;
  status: CustomerLifecycleStatus;
  contacts: ContactMethod[];
  addresses: PostalAddress[];
  segmentation?: CustomerSegmentation;
  billingProfile?: BillingProfile;
  serviceProfile?: ServiceProfile;
  metadata?: Record<string, string>;
}

export type CustomerEventTypeName =
  | "customer.created"
  | "customer.updated"
  | "customer.status_changed"
  | "customer.billing_profile_changed"
  | "customer.service_profile_changed"
  | "customer.merged";

export const canonicalCustomerEventTypes: readonly CustomerEventTypeName[] = [
  "customer.created",
  "customer.updated",
  "customer.status_changed",
  "customer.billing_profile_changed",
  "customer.service_profile_changed",
  "customer.merged",
] as const;

export interface DomainEvent<TType extends string, TPayload> {
  eventId: UUID;
  eventType: TType;
  aggregateType: "Customer";
  aggregateId: UUID;
  occurredAt: ISODateTime;
  publishedBy: BoundedContext | string;
  schemaVersion: number;
  correlationId?: UUID;
  causationId?: UUID;
  payload: TPayload;
}

export type CustomerCreated = DomainEvent<
  "customer.created",
  {
    customer: CustomerProfile;
  }
>;

export type CustomerUpdated = DomainEvent<
  "customer.updated",
  {
    customerId: UUID;
    changedAttributes: string[];
    customer: Partial<CustomerProfile>;
  }
>;

export type CustomerStatusChanged = DomainEvent<
  "customer.status_changed",
  {
    customerId: UUID;
    previousStatus: CustomerLifecycleStatus;
    newStatus: CustomerLifecycleStatus;
    reason?: string;
  }
>;

export type BillingProfileChanged = DomainEvent<
  "customer.billing_profile_changed",
  {
    customerId: UUID;
    billingProfile: BillingProfile;
  }
>;

export type ServiceProfileChanged = DomainEvent<
  "customer.service_profile_changed",
  {
    customerId: UUID;
    serviceProfile: ServiceProfile;
  }
>;

export type CustomerMerged = DomainEvent<
  "customer.merged",
  {
    survivingCustomerId: UUID;
    retiredCustomerId: UUID;
  }
>;

export type CustomerEvent =
  | CustomerCreated
  | CustomerUpdated
  | CustomerStatusChanged
  | BillingProfileChanged
  | ServiceProfileChanged
  | CustomerMerged;

export interface Topic<TEvent> {
  name: string;
  description: string;
  publishes: TEvent;
}

export interface Subscription<TEvent> {
  topicName: string;
  eventTypes: string[];
  filter?: (event: TEvent) => boolean;
  deliveryExpectation: "AtLeastOnce";
}

export interface Publisher<TEvent> {
  boundedContext: BoundedContext | string;
  canPublish(event: TEvent): boolean;
}

export interface Subscriber<TEvent> {
  boundedContext: BoundedContext | string;
  subscriptions: Subscription<TEvent>[];
}
