## Separating Concerns
Architecture View represents a system from the perspective of a related set of concerns. Architecture Viewpoint - a specification of the conventions for a particular kind of architecture view. It is a form of abstraction achieved using a selected set of architectural constructs as structuring rules, in order to focus on particular audience concerns frame within a system (ISO 42010). Viewpoint is a model (or description) of the information contained in a view.

Together these artifacts cover enterprise architecture, bounded-context
application design, governance, and operational delivery without tying the blueprint to a specific implementation platform.

## How TypeScript Files Relate
This project captures complementary views of the same system design:
- `event-contracts.ts`: shared canonical event and topic contracts
- `data-governance.ts`: shared ownership, sensitivity, and access policy model
- `enterprise-architecture.ts`: enterprise integration view for cross-system contracts, ownership, governance, and extensibility rules.
- `application-domain.ts`: front-office view repsponsible for development implementation.
- `devsecops-domain.ts`: testing, security, observebility, and maintenance view.

### Enterprise Architecture File

`enterprise-architecture.ts` defines:

- bounded contexts
- canonical customer identity and profile
- ownership rules
- shared event contracts
- pub/sub abstractions
- integration-layer governance
- external partner endpoints and access policies
- data classification and protection policy
- future-system extensibility

### Shared Contracts File

`event-contracts.ts` defines:

- canonical event names
- customer event envelopes and payloads
- shared customer identity and profile structures
- neutral topic, publisher, and subscriber abstractions

### Shared Data Governance File

`data-governance.ts` defines:

- attribute ownership rules
- data sensitivity classifications
- encryption and segregation policy
- external partner access policy
- prevent event storming

### Application Domain File

`application-domain.ts` defines:

- the front-office-owned customer aggregate
- front-office commands and service ports
- local projections for billing and service state
- event handlers that consume peer events
- an in-memory event router for local reasoning and testing

### DevSecOps Domain File

`devsecops-domain.ts` defines:

- CI/CD stages from planning and review through release
- delivery environments across `dev`, `test`, and `prod`
- quality gates for validation, contract safety, integration, performance, and rollback readiness
- security controls for dependency scanning, secret scanning, SAST, policy validation, signing, and runtime monitoring
- promotion rules and approval boundaries between environments
- artifact and release governance aligned to the Git Flow branching model


## Consistency Validation
This project can be validated as a lightweight TypeScript package without depending on any root-level repository configuration.
Included project files:

- `package.json`: project metadata and a `typecheck` script
- `tsconfig.json`: strict TypeScript compiler settings for schema validation
- `eslint.config.mjs`: lightweight linting for unused imports and TypeScript hygiene
- the parent repo `.gitignore`: ignores local dependency and build artifacts

Typical validation flow:
```powershell
npm install
node --run check
```

Or run the checks individually:
```powershell
node --run typecheck
node --run lint
```

This uses the TypeScript compiler as a consistency check across the architecture artifacts without generating runtime output.
ESLint adds lightweight static analysis for unused imports and TypeScript hygiene.
The optional YAML check extends the same consistency approach to the GitHub Actions orchestration files without making Python a core dependency of the blueprint itself.

The goal is to keep customer and stakeholder data aligned across front office, finance/billing, and service delivery systems while remaining decoupled, scalable, and easy to extend for future solutions.

The repository also includes a matching GitHub Actions orchestration skeleton
at [csp-blueprint-devsecops.yml](./architecture-as-code/.github/workflows/csp-blueprint-devsecops.yml)
and a reusable deployment contract at [csp-blueprint-deploy.yml](./architecture-as-code/.github/workflows/csp-blueprint-deploy.yml)
so GitHub can coordinate quality gates, approvals, immutable artifact promotion, and multi-cloud delivery without collapsing architecture, development, and DevOps concerns into one platform-specific design.

The workflow is pull-request driven for modern [Git Flow](https://github.com/gittower/git-flow-next) style branching such as
`feature/*`, `development`, `release/*`, `hotfix/*`, and `main`, and it does not auto-deploy on direct commits to `main`. 
Manual promotion is handled through `workflow_dispatch` with explicit deployment contract inputs such as target cloud, target cluster, and artifact version.

### Why Two GitHub Workflow Files
The two workflow files intentionally separate orchestration from deployment execution.
- `csp-blueprint-devsecops.yml` is the control-plane workflow. It decides when automation runs, which branch policy applies, which quality and security
  gates must pass, and whether a release may be promoted to `dev`, `test`, or `prod`.
- `csp-blueprint-deploy.yml` is the reusable deployment contract. It accepts a resolved deployment target such as environment, cloud, cluster, artifact
  version, and deployment strategy, then performs the delivery step for that specific target.

This split is useful because:
- GitHub workflow orchestration remains focused on SDLC governance and approval flow.
- Deployment execution becomes reusable across environments and clouds.
- Cloud-specific delivery logic can evolve without rewriting the whole DevSecOps pipeline.
- Architecture, Development, and DevOps teams can each own their concern area with clearer boundaries.

The architecture is intentionally split into two viewpoints because they answer different questions.
- Enterprise view: How do systems stay aligned across the landscape?
- Application view: How does the front-office bounded context publish and consume those shared contracts?

Together they show both strategic architecture and local implementation responsibility without tying the design to any vendor or platform.

Optional consistency check for the GitHub Actions workflow YAML local files using Python:
```powershell
py -c "import yaml, pathlib; yaml.safe_load(pathlib.Path(r'../.././github/workflows/csp-blueprint-devsecops.yml').read_text(encoding='utf-8')); yaml.safe_load(pathlib.Path(r'../.././github/workflows/csp-blueprint-deploy.yml').read_text(encoding='utf-8')); print('YAML_OK')"
```

## Best Practices Monitoring and Alert
- Use tools (like Prometheus) to collect and visualise metrics related to event processing: throughput, latency, error rate.
- Health Check to ensure services are functional.
- Structured logging, log aggregation (ELK stack), Correlation IDs, centralised logging
- Error Handling: retry policy, dead-letter-queue, Circuit Breaker
- Performance optimisation: batch, async, memory
- Security: encryption, AAA (Authentication, Authorization, Audit)