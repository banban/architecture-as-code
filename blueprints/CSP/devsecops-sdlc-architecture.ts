/**
 * DevSecOps and SDLC view for the CSP customer EDA blueprint.
 *
 * This file complements:
 * - `enterprise-eda-architecture.ts` for enterprise integration and governance
 * - `application-eda-domain.ts` for bounded-context application responsibilities
 *
 * Purpose:
 * - define how the solution is tested, secured, and delivered across environments
 * - capture quality gates, security controls, and promotion rules as architecture
 * - keep delivery concerns explicit without binding the blueprint to one CI/CD vendor
 */
import type { CustomerIntegrationArchitecture } from "./enterprise-eda-architecture.js";

export type DeliveryEnvironmentName = "dev" | "test" | "prod";

export type SourceControlStage =
  | "Plan"
  | "Implement"
  | "Review"
  | "Merge"
  | "Release";

export type PipelineStageName =
  | "StaticValidation"
  | "UnitAndContractTesting"
  | "SecurityScanning"
  | "PackageAndPublish"
  | "DeployDev"
  | "IntegrationAndE2ETesting"
  | "DeployTest"
  | "PreProductionApproval"
  | "DeployProd"
  | "PostDeploymentVerification";

export type QualityGateName =
  | "TypeSafety"
  | "Linting"
  | "SchemaCompatibility"
  | "UnitTestPass"
  | "ContractTestPass"
  | "IntegrationTestPass"
  | "EndToEndTestPass"
  | "PerformanceRegressionCheck"
  | "RollbackReadiness";

export type SecurityControlName =
  | "DependencyScanning"
  | "SecretScanning"
  | "StaticApplicationSecurityTesting"
  | "InfrastructurePolicyValidation"
  | "ContainerImageScanning"
  | "IdentityAndAccessReview"
  | "ArtifactSigning"
  | "DeploymentApproval"
  | "RuntimeVulnerabilityMonitoring";

export type TestSuiteType =
  | "StaticAnalysis"
  | "Unit"
  | "Contract"
  | "Integration"
  | "EndToEnd"
  | "Performance"
  | "Security"
  | "Smoke";

export type DeploymentStrategy =
  | "Recreate"
  | "Rolling"
  | "BlueGreen"
  | "Canary";

export type PromotionTrigger =
  | "AutomatedOnSuccess"
  | "ManualApproval"
  | "ChangeAdvisoryApproval";

export type BranchingModel = "GitFlow";

export type BranchType =
  | "main"
  | "development"
  | "feature"
  | "release"
  | "hotfix";

export interface BranchPolicy {
  type: BranchType;
  pattern: string;
  purpose: string;
  pullRequestValidationRequired: boolean;
  directPushDeploymentAllowed: boolean;
}

export interface DeliveryEnvironment {
  name: DeliveryEnvironmentName;
  purpose: string;
  deploymentStrategy: DeploymentStrategy;
  requiresApproval: boolean;
  baselineDataPolicy: "Synthetic" | "MaskedProductionLike" | "Production";
  observabilityLevel: "Standard" | "Elevated" | "Full";
}

export interface TestSuiteDefinition {
  name: string;
  type: TestSuiteType;
  objective: string;
  runsIn: DeliveryEnvironmentName[];
  blocksPromotion: boolean;
}

export interface QualityGate {
  name: QualityGateName;
  enforcedInStages: PipelineStageName[];
  description: string;
  failureAction: "BlockPipeline" | "RequireApproval" | "CreateException";
}

export interface SecurityControl {
  name: SecurityControlName;
  enforcedInStages: PipelineStageName[];
  description: string;
  mandatoryIn: DeliveryEnvironmentName[];
}

export interface PipelineStage {
  name: PipelineStageName;
  executesAfter?: PipelineStageName[];
  automated: boolean;
  environmentsInScope?: DeliveryEnvironmentName[];
  validates: Array<QualityGateName | SecurityControlName>;
}

export interface PromotionRule {
  from: DeliveryEnvironmentName;
  to: DeliveryEnvironmentName;
  trigger: PromotionTrigger;
  requiredQualityGates: QualityGateName[];
  requiredSecurityControls: SecurityControlName[];
  additionalConditions?: string[];
}

export interface ArtifactPolicy {
  immutableArtifactsRequired: boolean;
  provenanceRequired: boolean;
  signedArtifactsRequired: boolean;
  retentionPolicy: string;
}

export interface ReleaseGovernance {
  branchingModel: BranchingModel;
  branchPolicies: BranchPolicy[];
  trunkBasedDevelopmentPreferred: boolean;
  pullRequestReviewRequired: boolean;
  separationOfDutiesRequiredForProd: boolean;
  changeRecordRequiredForProd: boolean;
  rollbackPlanRequired: boolean;
}

export interface DevSecOpsArchitecture {
  solutionArchitecture: CustomerIntegrationArchitecture;
  sourceControlLifecycle: SourceControlStage[];
  environments: DeliveryEnvironment[];
  pipeline: PipelineStage[];
  tests: TestSuiteDefinition[];
  qualityGates: QualityGate[];
  securityControls: SecurityControl[];
  promotionRules: PromotionRule[];
  artifactPolicy: ArtifactPolicy;
  releaseGovernance: ReleaseGovernance;
}

/**
 * Example SDLC definition for this blueprint.
 * It shows one way to govern changes from commit through production delivery.
 */
export const cspDevSecOpsArchitecture = (
  solutionArchitecture: CustomerIntegrationArchitecture,
): DevSecOpsArchitecture => ({
  solutionArchitecture,
  sourceControlLifecycle: ["Plan", "Implement", "Review", "Merge", "Release"],
  environments: [
    {
      name: "dev",
      purpose: "Fast feedback for developers, early integration, and exploratory validation.",
      deploymentStrategy: "Rolling",
      requiresApproval: false,
      baselineDataPolicy: "Synthetic",
      observabilityLevel: "Standard",
    },
    {
      name: "test",
      purpose: "Stable environment for end-to-end validation, security checks, and release rehearsal.",
      deploymentStrategy: "BlueGreen",
      requiresApproval: true,
      baselineDataPolicy: "MaskedProductionLike",
      observabilityLevel: "Elevated",
    },
    {
      name: "prod",
      purpose: "Live regulated environment serving operational workloads and partner integrations.",
      deploymentStrategy: "Canary",
      requiresApproval: true,
      baselineDataPolicy: "Production",
      observabilityLevel: "Full",
    },
  ],
  pipeline: [
    {
      name: "StaticValidation",
      automated: true,
      validates: [
        "TypeSafety",
        "Linting",
        "DependencyScanning",
        "SecretScanning",
        "StaticApplicationSecurityTesting",
      ],
    },
    {
      name: "UnitAndContractTesting",
      automated: true,
      executesAfter: ["StaticValidation"],
      environmentsInScope: ["dev"],
      validates: ["UnitTestPass", "ContractTestPass", "SchemaCompatibility"],
    },
    {
      name: "SecurityScanning",
      automated: true,
      executesAfter: ["UnitAndContractTesting"],
      environmentsInScope: ["dev", "test"],
      validates: [
        "InfrastructurePolicyValidation",
        "ContainerImageScanning",
        "IdentityAndAccessReview",
      ],
    },
    {
      name: "PackageAndPublish",
      automated: true,
      executesAfter: ["SecurityScanning"],
      environmentsInScope: ["dev"],
      validates: ["ArtifactSigning"],
    },
    {
      name: "DeployDev",
      automated: true,
      executesAfter: ["PackageAndPublish"],
      environmentsInScope: ["dev"],
      validates: [],
    },
    {
      name: "IntegrationAndE2ETesting",
      automated: true,
      executesAfter: ["DeployDev"],
      environmentsInScope: ["dev", "test"],
      validates: [
        "IntegrationTestPass",
        "EndToEndTestPass",
        "PerformanceRegressionCheck",
      ],
    },
    {
      name: "DeployTest",
      automated: true,
      executesAfter: ["IntegrationAndE2ETesting"],
      environmentsInScope: ["test"],
      validates: [],
    },
    {
      name: "PreProductionApproval",
      automated: false,
      executesAfter: ["DeployTest"],
      environmentsInScope: ["test", "prod"],
      validates: ["DeploymentApproval", "RollbackReadiness"],
    },
    {
      name: "DeployProd",
      automated: false,
      executesAfter: ["PreProductionApproval"],
      environmentsInScope: ["prod"],
      validates: [],
    },
    {
      name: "PostDeploymentVerification",
      automated: true,
      executesAfter: ["DeployProd"],
      environmentsInScope: ["prod"],
      validates: ["RuntimeVulnerabilityMonitoring"],
    },
  ],
  tests: [
    {
      name: "ArchitectureAndTypeValidation",
      type: "StaticAnalysis",
      objective: "Check architecture artifacts, imports, and consistency before packaging.",
      runsIn: ["dev"],
      blocksPromotion: true,
    },
    {
      name: "CanonicalEventContractTests",
      type: "Contract",
      objective: "Verify schema compatibility and non-breaking customer event evolution.",
      runsIn: ["dev", "test"],
      blocksPromotion: true,
    },
    {
      name: "WorkflowIntegrationTests",
      type: "Integration",
      objective: "Validate enterprise integration, projections, and ServiceDelivery workflow orchestration.",
      runsIn: ["dev", "test"],
      blocksPromotion: true,
    },
    {
      name: "PartnerAndEnvironmentE2E",
      type: "EndToEnd",
      objective: "Verify critical paths across front office, service delivery, billing, and partner boundaries.",
      runsIn: ["test"],
      blocksPromotion: true,
    },
    {
      name: "PerformanceAndResilienceChecks",
      type: "Performance",
      objective: "Detect latency, queue lag, and retry amplification under representative load.",
      runsIn: ["test"],
      blocksPromotion: true,
    },
    {
      name: "ProductionSmokeTests",
      type: "Smoke",
      objective: "Confirm deployment health and critical connectivity after production release.",
      runsIn: ["prod"],
      blocksPromotion: false,
    },
  ],
  qualityGates: [
    {
      name: "TypeSafety",
      enforcedInStages: ["StaticValidation"],
      description: "Architecture and application artifacts must compile without type errors.",
      failureAction: "BlockPipeline",
    },
    {
      name: "Linting",
      enforcedInStages: ["StaticValidation"],
      description: "Code and architecture artifacts must comply with agreed quality rules.",
      failureAction: "BlockPipeline",
    },
    {
      name: "SchemaCompatibility",
      enforcedInStages: ["UnitAndContractTesting"],
      description: "Customer event contracts must evolve without breaking approved consumers.",
      failureAction: "BlockPipeline",
    },
    {
      name: "UnitTestPass",
      enforcedInStages: ["UnitAndContractTesting"],
      description: "Local logic must be verified before integration or deployment stages begin.",
      failureAction: "BlockPipeline",
    },
    {
      name: "ContractTestPass",
      enforcedInStages: ["UnitAndContractTesting"],
      description: "Producer and consumer expectations must remain aligned across systems.",
      failureAction: "BlockPipeline",
    },
    {
      name: "IntegrationTestPass",
      enforcedInStages: ["IntegrationAndE2ETesting"],
      description: "Cross-service flows must succeed in a representative environment.",
      failureAction: "BlockPipeline",
    },
    {
      name: "EndToEndTestPass",
      enforcedInStages: ["IntegrationAndE2ETesting"],
      description: "Critical business journeys must work across system and environment boundaries.",
      failureAction: "BlockPipeline",
    },
    {
      name: "PerformanceRegressionCheck",
      enforcedInStages: ["IntegrationAndE2ETesting"],
      description: "The release must not introduce unacceptable latency, lag, or throughput regression.",
      failureAction: "RequireApproval",
    },
    {
      name: "RollbackReadiness",
      enforcedInStages: ["PreProductionApproval"],
      description: "Rollback, replay, and recovery procedures must be prepared before production release.",
      failureAction: "BlockPipeline",
    },
  ],
  securityControls: [
    {
      name: "DependencyScanning",
      enforcedInStages: ["StaticValidation"],
      description: "Dependencies must be scanned for known vulnerabilities before packaging.",
      mandatoryIn: ["dev", "test", "prod"],
    },
    {
      name: "SecretScanning",
      enforcedInStages: ["StaticValidation"],
      description: "Repositories and build outputs must be checked for leaked credentials or tokens.",
      mandatoryIn: ["dev", "test", "prod"],
    },
    {
      name: "StaticApplicationSecurityTesting",
      enforcedInStages: ["StaticValidation"],
      description: "Source and configuration should be scanned for risky patterns and insecure defaults.",
      mandatoryIn: ["dev", "test", "prod"],
    },
    {
      name: "InfrastructurePolicyValidation",
      enforcedInStages: ["SecurityScanning"],
      description: "Deployment descriptors and platform policies must align with security baselines.",
      mandatoryIn: ["dev", "test", "prod"],
    },
    {
      name: "ContainerImageScanning",
      enforcedInStages: ["SecurityScanning"],
      description: "Runtime images must be scanned before promotion to higher environments.",
      mandatoryIn: ["test", "prod"],
    },
    {
      name: "IdentityAndAccessReview",
      enforcedInStages: ["SecurityScanning"],
      description: "Service principals, secrets, and environment permissions must be verified regularly.",
      mandatoryIn: ["test", "prod"],
    },
    {
      name: "ArtifactSigning",
      enforcedInStages: ["PackageAndPublish"],
      description: "Published artifacts should be signed so promoted releases remain traceable and trusted.",
      mandatoryIn: ["test", "prod"],
    },
    {
      name: "DeploymentApproval",
      enforcedInStages: ["PreProductionApproval"],
      description: "Human approval is required before higher-risk environment promotion.",
      mandatoryIn: ["test", "prod"],
    },
    {
      name: "RuntimeVulnerabilityMonitoring",
      enforcedInStages: ["PostDeploymentVerification"],
      description: "Production workloads and dependencies should continue to be monitored after release.",
      mandatoryIn: ["prod"],
    },
  ],
  promotionRules: [
    {
      from: "dev",
      to: "test",
      trigger: "AutomatedOnSuccess",
      requiredQualityGates: [
        "TypeSafety",
        "Linting",
        "SchemaCompatibility",
        "UnitTestPass",
        "ContractTestPass",
        "IntegrationTestPass",
      ],
      requiredSecurityControls: [
        "DependencyScanning",
        "SecretScanning",
        "StaticApplicationSecurityTesting",
        "InfrastructurePolicyValidation",
      ],
      additionalConditions: [
        "Artifacts are immutable and traceable.",
        "No unresolved high-severity delivery blockers remain open.",
      ],
    },
    {
      from: "test",
      to: "prod",
      trigger: "ChangeAdvisoryApproval",
      requiredQualityGates: [
        "EndToEndTestPass",
        "PerformanceRegressionCheck",
        "RollbackReadiness",
      ],
      requiredSecurityControls: [
        "ContainerImageScanning",
        "IdentityAndAccessReview",
        "ArtifactSigning",
        "DeploymentApproval",
      ],
      additionalConditions: [
        "Observability dashboards and alerts are prepared for release monitoring.",
        "Rollback or compensating release procedure has been rehearsed.",
      ],
    },
  ],
  artifactPolicy: {
    immutableArtifactsRequired: true,
    provenanceRequired: true,
    signedArtifactsRequired: true,
    retentionPolicy: "Keep signed release artifacts and security evidence for audit and rollback investigation.",
  },
  releaseGovernance: {
    branchingModel: "GitFlow",
    branchPolicies: [
      {
        type: "main",
        pattern: "main",
        purpose: "Production-aligned branch for approved releases and hotfix completion.",
        pullRequestValidationRequired: true,
        directPushDeploymentAllowed: false,
      },
      {
        type: "development",
        pattern: "development",
        purpose: "Primary integration branch for ongoing feature delivery.",
        pullRequestValidationRequired: true,
        directPushDeploymentAllowed: false,
      },
      {
        type: "feature",
        pattern: "feature/*",
        purpose: "Isolated branch family for feature work promoted through pull requests into development.",
        pullRequestValidationRequired: true,
        directPushDeploymentAllowed: false,
      },
      {
        type: "release",
        pattern: "release/*",
        purpose: "Release hardening branch family promoted through pull requests toward main.",
        pullRequestValidationRequired: true,
        directPushDeploymentAllowed: false,
      },
      {
        type: "hotfix",
        pattern: "hotfix/*",
        purpose: "Urgent production fix branch family promoted through pull requests toward main.",
        pullRequestValidationRequired: true,
        directPushDeploymentAllowed: false,
      },
    ],
    trunkBasedDevelopmentPreferred: false,
    pullRequestReviewRequired: true,
    separationOfDutiesRequiredForProd: true,
    changeRecordRequiredForProd: true,
    rollbackPlanRequired: true,
  },
});
