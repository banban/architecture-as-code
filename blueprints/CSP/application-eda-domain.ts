/**
 * Front-office application/domain view for the CSP customer EDA.
 *
 * This file complements `enterprise-eda-architecture.ts`.
 *
 * Perspective:
 * - enterprise file: cross-system contracts, ownership, governance, integration
 * - this file: front-office bounded context, application ports, and event handlers
 *
 * Important boundary:
 * - FrontOffice owns core identity, relationship, contact, and address data
 * - FinanceBilling owns billing data
 * - ServiceDelivery owns service data
 *
 * The front-office application publishes customer events for the data it owns
 * and consumes peer events to maintain local projections of billing and service state.
 */
import {
  type BillingProfileChanged,
  type ContactMethod,
  type CustomerCreated,
  type CustomerEvent,
  type CustomerEventTypeName,
  type CustomerLifecycleStatus,
  type CustomerMerged,
  type CustomerStatusChanged,
  type CustomerUpdated,
  type CustomerIdentity,
  type CustomerSegmentation,
  type PostalAddress,
  type ServiceProfileChanged,
  type UUID,
  type ISODateTime,
} from "./event-contracts.js";

/**
 * Front-office-owned aggregate. It excludes billing and service-owned attributes.
 */
export interface FrontOfficeCustomer {
  identity: CustomerIdentity;
  personOrOrganisation: "Person" | "Organisation";
  displayName: string;
  status: CustomerLifecycleStatus;
  contacts: ContactMethod[];
  addresses: PostalAddress[];
  segmentation?: CustomerSegmentation;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

/**
 * Local projections of data owned elsewhere. These are read models only.
 */
export interface BillingProfileProjection {
  billingAccountId?: string;
  billingStatus?: "Pending" | "Active" | "OnHold" | "Closed";
  paymentTerms?: string;
  lastSyncedAt: ISODateTime;
}

export interface ServiceProfileProjection {
  serviceAccountId?: string;
  serviceStatus?: "Pending" | "Provisioned" | "Active" | "Suspended" | "Closed";
  serviceLocations?: string[];
  lastSyncedAt: ISODateTime;
}

export interface FrontOfficeCustomerWorkspace {
  customer: FrontOfficeCustomer;
  billingProjection?: BillingProfileProjection;
  serviceProjection?: ServiceProfileProjection;
}
export type CustomerCreatedEvent = CustomerCreated;
export type CustomerUpdatedEvent = CustomerUpdated;
export type CustomerStatusChangedEvent = CustomerStatusChanged;
export type BillingProfileChangedEvent = BillingProfileChanged;
export type ServiceProfileChangedEvent = ServiceProfileChanged;
export type CustomerMergedEvent = CustomerMerged;

export const canonicalCustomerEventTypes: readonly CustomerEventTypeName[] = [
  "customer.created",
  "customer.updated",
  "customer.status_changed",
  "customer.billing_profile_changed",
  "customer.service_profile_changed",
  "customer.merged",
] as const;

export const FrontOfficeRules = {
  canTransitionStatus(
    from: CustomerLifecycleStatus,
    to: CustomerLifecycleStatus,
  ): boolean {
    const forbidden: Partial<Record<CustomerLifecycleStatus, CustomerLifecycleStatus[]>> = {
      Closed: ["Active", "Suspended"],
      Suspended: ["Active"],
    };
    return !(forbidden[from]?.includes(to));
  },
} as const;

export type Result<T, E extends string = string> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export interface RegisterCustomerCommand {
  customer: Omit<FrontOfficeCustomer, "identity" | "createdAt" | "updatedAt">;
}

export interface UpdateCustomerCommand {
  customerId: UUID;
  changes: Partial<
    Pick<
      FrontOfficeCustomer,
      "displayName" | "contacts" | "addresses" | "segmentation"
    >
  >;
}

export interface ChangeCustomerStatusCommand {
  customerId: UUID;
  newStatus: CustomerLifecycleStatus;
  reason?: string;
}

/**
 * Only front-office-owned mutations are exposed here.
 * Billing and service updates arrive asynchronously as peer events.
 */
export interface FrontOfficeCustomerService {
  registerCustomer(
    cmd: RegisterCustomerCommand,
  ): Promise<Result<UUID, "validation_failed" | "duplicate">>;
  updateCustomer(
    cmd: UpdateCustomerCommand,
  ): Promise<Result<void, "not_found" | "validation_failed">>;
  changeStatus(
    cmd: ChangeCustomerStatusCommand,
  ): Promise<Result<void, "not_found" | "invalid_transition">>;
}

export interface FrontOfficeCustomerRepository {
  findById(id: UUID): Promise<FrontOfficeCustomer | null>;
  save(customer: FrontOfficeCustomer): Promise<void>;
}

export interface FrontOfficeProjectionRepository {
  saveBillingProjection(
    customerId: UUID,
    billing: BillingProfileProjection,
  ): Promise<void>;
  saveServiceProjection(
    customerId: UUID,
    service: ServiceProfileProjection,
  ): Promise<void>;
}

export interface CustomerEventBus {
  publish(event: CustomerEvent): Promise<void>;
}

export interface CustomerEventSubscriber {
  subscribedTo: ReadonlyArray<CustomerEventTypeName>;
  onEvent(event: CustomerEvent): Promise<void>;
}

export interface CustomerEventHandler<TEvent extends CustomerEvent> {
  handles: TEvent["eventType"];
  handle(event: TEvent): Promise<void>;
}

/**
 * Front-office handlers consume peer events so users can see the latest
 * billing and service state without making those systems tightly coupled.
 */
export type FrontOfficeBillingProfileChangedHandler =
  CustomerEventHandler<BillingProfileChangedEvent>;

export type FrontOfficeServiceProfileChangedHandler =
  CustomerEventHandler<ServiceProfileChangedEvent>;

/**
 * Finance and service delivery still define their own projections locally.
 * These remain useful as application-level read models and align with the
 * enterprise file's ownership rules.
 */
export interface BillingCustomerProjection {
  customerId: UUID;
  displayName: string;
  billingAddress?: PostalAddress;
  paymentTerms?: string;
  status: CustomerLifecycleStatus;
  syncedAt: ISODateTime;
}

export interface ServiceCustomerProjection {
  customerId: UUID;
  displayName: string;
  primaryPhone?: string;
  serviceAddress?: PostalAddress;
  serviceStatus?: ServiceProfileProjection["serviceStatus"];
  syncedAt: ISODateTime;
}

export type FinanceCustomerCreatedHandler =
  CustomerEventHandler<CustomerCreatedEvent>;

export type FinanceCustomerUpdatedHandler =
  CustomerEventHandler<CustomerUpdatedEvent>;

export type FinanceCustomerStatusChangedHandler =
  CustomerEventHandler<CustomerStatusChangedEvent>;

export type ServiceCustomerCreatedHandler =
  CustomerEventHandler<CustomerCreatedEvent>;

export type ServiceCustomerUpdatedHandler =
  CustomerEventHandler<CustomerUpdatedEvent>;

export type ServiceCustomerStatusChangedHandler =
  CustomerEventHandler<CustomerStatusChangedEvent>;

/**
 * Small in-memory router purely for local reasoning and tests.
 * A real implementation would be backed by the enterprise integration layer.
 */
export class CustomerEventRouter implements CustomerEventBus {
  private readonly subscribers = new Map<CustomerEventTypeName, CustomerEventSubscriber[]>();

  register(subscriber: CustomerEventSubscriber): void {
    for (const eventType of subscriber.subscribedTo) {
      const current = this.subscribers.get(eventType) ?? [];
      this.subscribers.set(eventType, [...current, subscriber]);
    }
  }

  async publish(event: CustomerEvent): Promise<void> {
    const targets = this.subscribers.get(event.eventType) ?? [];
    await Promise.all(targets.map((subscriber) => subscriber.onEvent(event)));
  }
}
