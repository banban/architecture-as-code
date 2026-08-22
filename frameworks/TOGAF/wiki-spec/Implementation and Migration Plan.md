# Implementation and Migration Plan

Version: `[version]`  
Date: `[date]`  
Organisation: `[Organisation]`  
Capability: `[Capability]`  
Status: `[status]`

## Purpose and boundary

Convert the roadmap and transition architecture into delivery waves, migration decisions, release evidence, readiness gates, and acceptance activities.

## Findings consolidation

| Finding/requirement | Source | Impact | Work package | Acceptance evidence |
|---|---|---|---|---|
| `[ID]` | `[source]` | `[impact]` | `[WP-ID]` | `[evidence]` |

## Migration strategy

Describe migration approach, sequencing, coexistence, data reconciliation, interface cutover, rollback, decommissioning, support handover, and communications.

## Implementation waves

| Wave | Objective | Activities | Dependencies | Exit gate |
|---|---|---|---|---|
| `Wave [n]` | `[objective]` | `[activities]` | `[IDs]` | `[evidence]` |

Suggested concerns: evidence completion; security and identity; catalogue and API governance; observability and operations; runtime/data conversion; build and test; production readiness and handover.

## Migration decision matrix

| Asset/interface | Disposition | Rationale | Preconditions | Rollback | Owner |
|---|---|---|---|---|---|
| `[ID/name]` | `[retain/migrate/replace/retire]` | `[reason]` | `[conditions]` | `[plan]` | `[role]` |

## Readiness gates

| Gate | Required evidence | Approver | Status |
|---|---|---|---|
| Design | `[design, requirements, ADRs]` | `[role]` | `[status]` |
| Security | `[identity, secrets, network, threat assessment]` | `[role]` | `[status]` |
| Test | `[functional, integration, performance, recovery]` | `[role]` | `[status]` |
| Operations | `[monitoring, runbook, support, alerting]` | `[role]` | `[status]` |
| Release | `[approval, rollback, evidence, change record]` | `[role]` | `[status]` |

## Risks, dependencies and backlog

Record delivery risks, dependencies, assumptions, implementation tasks, owners, dates, and traceability IDs.

## Acceptance criteria

Define measurable business, technical, security, data, operational, and handover acceptance criteria.

## Example

Wave 1 validates the contract and security model; Wave 2 deploys the integration to a non-production environment; Wave 3 runs reconciliation, performance, failure, and recovery tests; Wave 4 obtains approval, cuts over, monitors, and hands over support. Rollback returns processing to the approved interim path.

## TOGAF 10 alignment

This supports Phase F Migration Planning and Phase G Implementation Governance. It turns the roadmap into executable waves, readiness gates, acceptance evidence, cutover controls, and post-implementation governance.
