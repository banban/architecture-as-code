# Architecture Roadmap

Version: `[version]`  
Date: `[date]`  
Organisation: `[Organisation]`  
Capability: `[Capability]`  
Status: `[status]`

## Purpose and boundary

Define prioritised work packages, dependencies, sequencing, transition architectures, and target outcomes. Keep detailed execution steps in the Implementation and Migration Plan.

## Roadmap inputs and disposition model

Use evidence from assessments, catalogues, ADRs, requirements, and approved scope. Classify each relevant asset, interface, or capability as `retain`, `remediate`, `migrate`, `replace`, or `retire`.

## Work package portfolio

| WP ID | Work package | Outcome | Priority | Dependency | Owner | Target milestone |
|---|---|---|---|---|---|---|
| `WP-[nnn]` | `[name]` | `[outcome]` | `[P1/P2/P3]` | `[IDs]` | `[role]` | `[milestone/date]` |

## Prioritisation model

Define scoring for value, risk reduction, regulatory need, dependency, effort, cost, readiness, and reversibility.

## Roadmap phases

| Phase | Objective | Entry criteria | Outputs | Exit criteria |
|---|---|---|---|---|
| `[phase]` | `[objective]` | `[criteria]` | `[outputs]` | `[criteria]` |

## Dependencies, risks and decisions

| ID | Type | Description | Affected work | Owner | Treatment/status |
|---|---|---|---|---|---|
| `[ID]` | `[dependency/risk/decision]` | `[description]` | `[WP]` | `[role]` | `[status]` |

## Milestones and approval questions

Record target dates, decision points, evidence required, and the question each governance forum must answer before promotion.

## Example

`WP-001` establishes the interface catalogue, `WP-002` introduces identity and secret controls, `WP-003` implements the target integration, and `WP-004` retires the interim path. `WP-003` depends on `REQ-001`, `INT-001`, `DATA-001`, and `ADR-001`.

## TOGAF 10 alignment

This is primarily a Phase E and Phase F artefact. It converts gaps into opportunities, solution increments, work packages, dependencies, and a migration roadmap, while maintaining traceability to the Architecture Definition and requirements.
