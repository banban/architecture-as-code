/**
 * Enterprise integration view of the CSP customer EDA.
 *
 * This file complements `application-eda-domain.ts`.
 *
 * Perspective:
 * - this file: cross-system contracts, ownership, governance, and extensibility
 * - application file: front-office bounded context, ports, and consumer handlers
 *
 * Purpose:
 * - express core business concepts and system relationships
 * - model publish/subscribe contracts without choosing products
 * - show how systems remain decoupled while sharing customer changes
 */
import {
  BoundedContext,
  CUSTOMER_TOPIC_NAME,
  type CustomerEvent,
  type CustomerEventTypeName,
  type Subscriber,
  type Topic,
} from "./event-contracts.js";
import {
  cspDataProtectionPolicy,
  customerOwnershipRules,
  evaluatePingPongRisk,
  externalPartnerAccessPolicies,
  sharedCustomerAttributeUpdatePolicies,
  type DataOwnershipRule,
  type DataProtectionPolicy,
  type DataSensitivity,
  type ExternalPartnerAccessPolicy,
  type ExternalPartnerType,
  type PingPongGuardDecision,
  type PingPongGuardInput,
  type SharedAttributeUpdatePolicy,
} from "./data-governance.js";

/**
 * Consumers update their own local read models or operational records.
 * They should be idempotent to tolerate retries and duplicate delivery.
 */
export interface EventConsumer<TEvent> {
  subscriber: Subscriber<TEvent>;
  isIdempotent: true;
  handle(event: TEvent): CustomerDataProjectionChange[];
}

export interface CustomerDataProjectionChange {
  targetSystem: BoundedContext | string;
  targetRecordId?: string;
  action: "Create" | "Update" | "Deactivate" | "Merge";
  impactedFields: string[];
}

/**
 * Integration layer responsibilities are separated from business systems.
 * This keeps transformation, governance, and observability out of core apps.
 */
export interface IntegrationLayer {
  canonicalModel: "Customer";
  topics: Array<Topic<CustomerEvent>>;
  policies: IntegrationPolicy[];
  routes: IntegrationRoute[];
  governance: GovernanceControls;
}

export interface IntegrationPolicy {
  name:
    | "Validation"
    | "SchemaVersioning"
    | "Idempotency"
    | "Retry"
    | "DeadLetterHandling"
    | "Replay"
    | "AuditTrail";
  description: string;
}

export interface IntegrationRoute {
  from: BoundedContext | string;
  publishesTo: string;
  consumedBy: Array<BoundedContext | string>;
}

export interface GovernanceControls {
  ownershipRules: DataOwnershipRule[];
  schemaRegistryRequired: boolean;
  traceabilityRequired: boolean;
  reconciliationRequired: boolean;
  dataProtection: DataProtectionPolicy;
  partnerAccessPolicies: ExternalPartnerAccessPolicy[];
  sharedAttributePolicies?: SharedAttributeUpdatePolicy[];
}

export interface RepublishAssessmentRequest extends PingPongGuardInput {
  integrationPolicyName: "Validation" | "Idempotency" | "AuditTrail";
}

export interface IntegrationGovernanceService {
  assessRepublish(request: RepublishAssessmentRequest): PingPongGuardDecision;
}

export type IntegrationEndpointType =
  | "EventSubscriber"
  | "EventPublisher"
  | "Bidirectional"
  | "SecureApi";

export interface ExternalPartnerEndpoint {
  partnerName: string;
  partnerType: ExternalPartnerType;
  endpointType: IntegrationEndpointType;
  eventSubscriptions?: CustomerEventTypeName[];
  eventPublications?: string[];
  minimumSensitivityClearance: DataSensitivity;
}

export type ServiceWorkflowIntent =
  | "Provision"
  | "UpdateService"
  | "SuspendService"
  | "ResumeService"
  | "RelocateService"
  | "CloseService"
  | "NotifyPartner"
  | "Reconcile";

export type ServiceWorkflowPriority =
  | "P1Critical"
  | "P2CustomerImpacting"
  | "P3StandardOperational"
  | "P4Background";

export type ServiceWorkflowLane =
  | "RealTimeOperations"
  | "ProvisioningAndFulfillment"
  | "PartnerAndFieldCoordination"
  | "ProjectionAndNotification"
  | "ReconciliationAndReplay";

export type ServiceSerializationKeyType =
  | "ServiceAccountId"
  | "CustomerId"
  | "PartnerCaseId"
  | "ExternalReference"
  | "Region"
  | "WorkBasket";

export type ServiceWorkflowStage =
  | "Ingress"
  | "PriorityAndPartition"
  | "PreChecks"
  | "Execution"
  | "Coordination"
  | "Publication";

export type ServiceWorkflowState =
  | "Accepted"
  | "Prepared"
  | "Dispatched"
  | "Waiting"
  | "Resumed"
  | "Completed"
  | "Compensating"
  | "Failed";

export type ServiceDeliveryConsumerRole =
  | "WorkflowOrchestrator"
  | "ProjectionUpdater"
  | "PartnerAdapter"
  | "AuditRecorder"
  | "NotificationPublisher"
  | "ReconciliationWorker";

export interface ServiceWorkflowQueuePolicy {
  lane: ServiceWorkflowLane;
  supportedPriorities: ServiceWorkflowPriority[];
  intentTypes: ServiceWorkflowIntent[];
  maxConcurrency: number;
  fairnessPolicy:
    | "StrictPriority"
    | "WeightedFairness"
    | "ReservedCapacityForCritical";
  defaultSerializationKey: ServiceSerializationKeyType;
  allowsParallelExecutionWhenKeysDiffer: true;
  replayRunsInSeparateCapacityPool: boolean;
}

export interface ServiceWorkflowStepDefinition {
  name: string;
  stage: ServiceWorkflowStage;
  description: string;
  mutatesOwnedState: boolean;
  canRunInParallel: boolean;
  dependsOn?: string[];
  serializationKeys?: ServiceSerializationKeyType[];
  emitsEvents?: string[];
}

export interface ServiceWorkflowDefinition {
  intent: ServiceWorkflowIntent;
  lane: ServiceWorkflowLane;
  priority: ServiceWorkflowPriority;
  entryEventTypes: CustomerEventTypeName[];
  possibleStates: ServiceWorkflowState[];
  steps: ServiceWorkflowStepDefinition[];
}

export interface ServiceDeliveryConsumerPolicy {
  role: ServiceDeliveryConsumerRole;
  writesToOwnedStore: boolean;
  sharesMutableStateAcrossConsumers: false;
  concurrencyControl:
    | "SerializationKey"
    | "OptimisticVersionCheck"
    | "AppendOnlyProjection";
}

export interface ServiceDeliveryPipelineArchitecture {
  intents: ServiceWorkflowIntent[];
  stages: ServiceWorkflowStage[];
  queues: ServiceWorkflowQueuePolicy[];
  workflows: ServiceWorkflowDefinition[];
  consumerPolicies: ServiceDeliveryConsumerPolicy[];
  workflowStateStoreRequired: true;
  deadLetterIsolationRequired: true;
  stuckWorkflowAlertingRequired: true;
}

/**
 * End-to-end solution view.
 */
export interface CustomerIntegrationArchitecture {
  customerTopic: Topic<CustomerEvent>;
  systems: ConnectedSystem[];
  integrationLayer: IntegrationLayer;
  serviceDeliveryPipeline?: ServiceDeliveryPipelineArchitecture;
  externalPartners?: ExternalPartnerEndpoint[];
}

export interface ConnectedSystem {
  context: BoundedContext | string;
  role: "SystemOfRecord" | "Publisher" | "Subscriber" | "Mixed";
  publishes?: CustomerEventTypeName[];
  subscribes?: CustomerEventTypeName[];
  ownsAttributeGroups: DataOwnershipRule["attributeGroup"][];
}

/**
 * Example definition for architecture review scenario for particular CSP/company.
 * This is not executable integration code; it is a domain-level blueprint.
 */
export const cspCustomerArchitecture: CustomerIntegrationArchitecture = {
  customerTopic: {
    name: CUSTOMER_TOPIC_NAME,
    description: "Shared topic carrying customer domain events for downstream systems",
    publishes: {} as CustomerEvent,
  },
  systems: [
    {
      context: BoundedContext.FrontOffice,
      role: "Mixed",
      publishes: ["customer.created", "customer.updated", "customer.status_changed"],
      subscribes: ["customer.billing_profile_changed", "customer.service_profile_changed"],
      ownsAttributeGroups: ["CoreIdentity", "RelationshipData", "ContactData", "AddressData"],
    },
    {
      context: BoundedContext.FinanceBilling,
      role: "Mixed",
      publishes: ["customer.billing_profile_changed"],
      subscribes: ["customer.created", "customer.updated", "customer.status_changed"],
      ownsAttributeGroups: ["BillingData"],
    },
    {
      context: BoundedContext.ServiceDelivery,
      role: "Mixed",
      publishes: ["customer.service_profile_changed"],
      subscribes: ["customer.created", "customer.updated", "customer.status_changed"],
      ownsAttributeGroups: ["ServiceData"],
    },
  ],
  externalPartners: [
    {
      partnerName: "GovernmentRegulator",
      partnerType: "GovernmentRegulator",
      endpointType: "EventSubscriber",
      eventSubscriptions: ["customer.status_changed"],
      minimumSensitivityClearance: "PII",
    },
    {
      partnerName: "EmergencyService",
      partnerType: "EmergencyService",
      endpointType: "Bidirectional",
      eventSubscriptions: ["customer.created", "customer.updated", "customer.status_changed"],
      eventPublications: ["emergency.incident_opened", "emergency.incident_closed"],
      minimumSensitivityClearance: "SensitiveHealth",
    },
    {
      partnerName: "VolunteerOrganisation",
      partnerType: "VolunteerOrganisation",
      endpointType: "Bidirectional",
      eventSubscriptions: ["customer.created", "customer.updated"],
      eventPublications: ["partner.referral_accepted", "partner.referral_completed"],
      minimumSensitivityClearance: "Internal",
    },
    {
      partnerName: "NonProfitPartner",
      partnerType: "NonProfitPartner",
      endpointType: "Bidirectional",
      eventSubscriptions: ["customer.created", "customer.updated", "customer.status_changed"],
      eventPublications: ["partner.case_opened", "partner.case_closed"],
      minimumSensitivityClearance: "PII",
    },
  ],
  integrationLayer: {
    canonicalModel: "Customer",
    topics: [
      {
        name: CUSTOMER_TOPIC_NAME,
        description: "Shared topic carrying customer domain events for downstream systems",
        publishes: {} as CustomerEvent,
      },
    ],
    policies: [
      {
        name: "Validation",
        description: "Validate business and schema rules before publication or consumption",
      },
      {
        name: "SchemaVersioning",
        description: "Version events to allow safe evolution for future consumers",
      },
      {
        name: "Idempotency",
        description: "Require duplicate-safe consumption across all subscribers",
      },
      {
        name: "Retry",
        description: "Retry transient failures without losing customer events",
      },
      {
        name: "DeadLetterHandling",
        description: "Isolate poison events for investigation and controlled replay",
      },
      {
        name: "Replay",
        description: "Allow new or recovering systems to rebuild customer views from event history",
      },
      {
        name: "AuditTrail",
        description: "Track who published what, when, and how it propagated",
      },
    ],
    routes: [
      {
        from: BoundedContext.FrontOffice,
        publishesTo: CUSTOMER_TOPIC_NAME,
        consumedBy: [BoundedContext.FinanceBilling, BoundedContext.ServiceDelivery],
      },
      {
        from: BoundedContext.FinanceBilling,
        publishesTo: CUSTOMER_TOPIC_NAME,
        consumedBy: [BoundedContext.FrontOffice, BoundedContext.ServiceDelivery],
      },
      {
        from: BoundedContext.ServiceDelivery,
        publishesTo: CUSTOMER_TOPIC_NAME,
        consumedBy: [BoundedContext.FrontOffice, BoundedContext.FinanceBilling],
      },
    ],
    governance: {
      ownershipRules: [...customerOwnershipRules],
      schemaRegistryRequired: true,
      traceabilityRequired: true,
      reconciliationRequired: true,
      dataProtection: cspDataProtectionPolicy,
      partnerAccessPolicies: [...externalPartnerAccessPolicies],
      sharedAttributePolicies: [...sharedCustomerAttributeUpdatePolicies],
    },
  },
  serviceDeliveryPipeline: {
    intents: [
      "Provision",
      "UpdateService",
      "SuspendService",
      "ResumeService",
      "RelocateService",
      "CloseService",
      "NotifyPartner",
      "Reconcile",
    ],
    stages: [
      "Ingress",
      "PriorityAndPartition",
      "PreChecks",
      "Execution",
      "Coordination",
      "Publication",
    ],
    queues: [
      {
        lane: "RealTimeOperations",
        supportedPriorities: ["P1Critical", "P2CustomerImpacting"],
        intentTypes: ["SuspendService", "ResumeService", "UpdateService"],
        maxConcurrency: 24,
        fairnessPolicy: "ReservedCapacityForCritical",
        defaultSerializationKey: "ServiceAccountId",
        allowsParallelExecutionWhenKeysDiffer: true,
        replayRunsInSeparateCapacityPool: true,
      },
      {
        lane: "ProvisioningAndFulfillment",
        supportedPriorities: ["P2CustomerImpacting", "P3StandardOperational"],
        intentTypes: ["Provision", "RelocateService", "CloseService"],
        maxConcurrency: 16,
        fairnessPolicy: "WeightedFairness",
        defaultSerializationKey: "ServiceAccountId",
        allowsParallelExecutionWhenKeysDiffer: true,
        replayRunsInSeparateCapacityPool: true,
      },
      {
        lane: "PartnerAndFieldCoordination",
        supportedPriorities: ["P2CustomerImpacting", "P3StandardOperational"],
        intentTypes: ["NotifyPartner"],
        maxConcurrency: 12,
        fairnessPolicy: "WeightedFairness",
        defaultSerializationKey: "PartnerCaseId",
        allowsParallelExecutionWhenKeysDiffer: true,
        replayRunsInSeparateCapacityPool: true,
      },
      {
        lane: "ProjectionAndNotification",
        supportedPriorities: ["P2CustomerImpacting", "P3StandardOperational"],
        intentTypes: ["UpdateService", "NotifyPartner"],
        maxConcurrency: 32,
        fairnessPolicy: "WeightedFairness",
        defaultSerializationKey: "CustomerId",
        allowsParallelExecutionWhenKeysDiffer: true,
        replayRunsInSeparateCapacityPool: true,
      },
      {
        lane: "ReconciliationAndReplay",
        supportedPriorities: ["P4Background"],
        intentTypes: ["Reconcile"],
        maxConcurrency: 8,
        fairnessPolicy: "StrictPriority",
        defaultSerializationKey: "WorkBasket",
        allowsParallelExecutionWhenKeysDiffer: true,
        replayRunsInSeparateCapacityPool: true,
      },
    ],
    workflows: [
      {
        intent: "Provision",
        lane: "ProvisioningAndFulfillment",
        priority: "P2CustomerImpacting",
        entryEventTypes: ["customer.created", "customer.updated"],
        possibleStates: [
          "Accepted",
          "Prepared",
          "Dispatched",
          "Waiting",
          "Resumed",
          "Completed",
          "Compensating",
          "Failed",
        ],
        steps: [
          {
            name: "ClassifyWorkIntent",
            stage: "Ingress",
            description: "Determine whether the inbound event creates new service work.",
            mutatesOwnedState: false,
            canRunInParallel: true,
          },
          {
            name: "ValidateAndReserveWorkflow",
            stage: "PreChecks",
            description: "Run policy, duplication, and dependency checks before execution.",
            mutatesOwnedState: true,
            canRunInParallel: false,
            serializationKeys: ["ServiceAccountId", "CustomerId"],
          },
          {
            name: "PrepareProvisioningPlan",
            stage: "Execution",
            description: "Build the service fulfillment plan and allocate internal work items.",
            mutatesOwnedState: true,
            canRunInParallel: false,
            dependsOn: ["ValidateAndReserveWorkflow"],
            serializationKeys: ["ServiceAccountId"],
          },
          {
            name: "NotifyPartnerOrFieldSystems",
            stage: "Execution",
            description: "Trigger independent partner or field coordination work.",
            mutatesOwnedState: false,
            canRunInParallel: true,
            dependsOn: ["PrepareProvisioningPlan"],
            serializationKeys: ["PartnerCaseId"],
            emitsEvents: ["partner.case_opened"],
          },
          {
            name: "PersistWaitingState",
            stage: "Coordination",
            description: "Persist waiting conditions for callbacks, approvals, or timed retries.",
            mutatesOwnedState: true,
            canRunInParallel: false,
            dependsOn: ["PrepareProvisioningPlan"],
            serializationKeys: ["ServiceAccountId"],
          },
          {
            name: "PublishServiceProfileUpdate",
            stage: "Publication",
            description: "Publish service state changes and projection updates after workflow progress.",
            mutatesOwnedState: false,
            canRunInParallel: true,
            dependsOn: ["PersistWaitingState"],
            emitsEvents: ["customer.service_profile_changed"],
          },
        ],
      },
      {
        intent: "Reconcile",
        lane: "ReconciliationAndReplay",
        priority: "P4Background",
        entryEventTypes: [
          "customer.created",
          "customer.updated",
          "customer.status_changed",
          "customer.service_profile_changed",
        ],
        possibleStates: ["Accepted", "Prepared", "Dispatched", "Completed", "Failed"],
        steps: [
          {
            name: "LoadExpectedAndActualState",
            stage: "PreChecks",
            description: "Compare expected service state against projections and source-of-record state.",
            mutatesOwnedState: false,
            canRunInParallel: true,
            serializationKeys: ["WorkBasket", "ServiceAccountId"],
          },
          {
            name: "RepairProjectionOrEscalate",
            stage: "Execution",
            description: "Repair drift when safe, otherwise create an operational exception path.",
            mutatesOwnedState: true,
            canRunInParallel: false,
            dependsOn: ["LoadExpectedAndActualState"],
            serializationKeys: ["ServiceAccountId"],
          },
          {
            name: "PublishRepairOutcome",
            stage: "Publication",
            description: "Publish reconciliation outcomes for downstream visibility and audit.",
            mutatesOwnedState: false,
            canRunInParallel: true,
            dependsOn: ["RepairProjectionOrEscalate"],
          },
        ],
      },
    ],
    consumerPolicies: [
      {
        role: "WorkflowOrchestrator",
        writesToOwnedStore: true,
        sharesMutableStateAcrossConsumers: false,
        concurrencyControl: "SerializationKey",
      },
      {
        role: "ProjectionUpdater",
        writesToOwnedStore: true,
        sharesMutableStateAcrossConsumers: false,
        concurrencyControl: "AppendOnlyProjection",
      },
      {
        role: "PartnerAdapter",
        writesToOwnedStore: true,
        sharesMutableStateAcrossConsumers: false,
        concurrencyControl: "SerializationKey",
      },
      {
        role: "AuditRecorder",
        writesToOwnedStore: true,
        sharesMutableStateAcrossConsumers: false,
        concurrencyControl: "AppendOnlyProjection",
      },
      {
        role: "NotificationPublisher",
        writesToOwnedStore: true,
        sharesMutableStateAcrossConsumers: false,
        concurrencyControl: "AppendOnlyProjection",
      },
      {
        role: "ReconciliationWorker",
        writesToOwnedStore: true,
        sharesMutableStateAcrossConsumers: false,
        concurrencyControl: "OptimisticVersionCheck",
      },
    ],
    workflowStateStoreRequired: true,
    deadLetterIsolationRequired: true,
    stuckWorkflowAlertingRequired: true,
  },
};

/**
 * Enterprise integration layer applies governance before any consumer republishes
 * customer changes. This is where ping-pong suppression belongs conceptually:
 * not inside one application alone, but in the cross-system delivery policy.
 */
export function assessGovernedRepublish(
  architecture: CustomerIntegrationArchitecture,
  request: RepublishAssessmentRequest,
): PingPongGuardDecision {
  return evaluatePingPongRisk({
    ...request,
    sharedAttributePolicies: request.sharedAttributePolicies
      ?? architecture.integrationLayer.governance.sharedAttributePolicies
      ?? sharedCustomerAttributeUpdatePolicies,
  });
}

/**
 * Example extension point: a new solution can join by subscribing to the
 * customer topic and optionally publishing events for the data it owns.
 */
export function connectFutureSystem(
  architecture: CustomerIntegrationArchitecture,
  systemName: string,
  subscribesTo: CustomerEventTypeName[] = [
    "customer.created",
    "customer.updated",
    "customer.status_changed",
  ],
): CustomerIntegrationArchitecture {
  return {
    ...architecture,
    systems: [
      ...architecture.systems,
      {
        context: systemName,
        role: "Subscriber",
        subscribes: subscribesTo,
        ownsAttributeGroups: [],
      },
    ],
    integrationLayer: {
      ...architecture.integrationLayer,
      routes: architecture.integrationLayer.routes.map((route) => ({
        ...route,
        consumedBy: [...route.consumedBy, systemName],
      })),
    },
  };
}
