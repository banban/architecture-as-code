# Requirements Catalog

Version: `[version]`  
Date: `[date]`  
Organisation: `[Organisation]`  
Capability: `[Capability]`  
Status: `[status]`

## Catalogue authority and traceability

This catalogue is authoritative for requirement IDs, priorities, sources, assumptions, constraints, gaps, and acceptance measures.

## Architecture principles

| ID | Requirement | Rationale | Priority | Source | Acceptance |
|---|---|---|---|---|---|
| `REQ-[nnn]` | `[requirement]` | `[why]` | `[MoSCoW]` | `[source]` | `[evidence]` |

## Functional requirements

| ID | Capability or behaviour | Actor/system | Interface/data reference | Priority | Acceptance |
|---|---|---|---|---|---|
| `FR-[nnn]` | `[behaviour]` | `[actor]` | `[INT/DATA]` | `[priority]` | `[test]` |

## Non-functional requirements

Capture availability, performance, scalability, resilience, recoverability, security, privacy, audit, supportability, maintainability, portability, and cost.

| ID | Quality attribute | Measure and target | Scope | Verification |
|---|---|---|---|---|
| `NFR-[nnn]` | `[attribute]` | `[target]` | `[scope]` | `[method]` |

## Assumption, constraint and gap logs

| Type | ID | Statement | Owner | Due/status | Affected artefacts |
|---|---|---|---|---|---|
| `[assumption/constraint/gap]` | `[ID]` | `[statement]` | `[role]` | `[status]` | `[links]` |

## Complexity definition

Define the factors and scoring bands used to classify an integration or change as low, medium, high, or exceptional complexity.

## Example

`FR-001`: `[System A]` shall publish an approved `[Business Entity]` change to authorised consumers. Source: `[business requirement]`. Priority: Must. Acceptance: contract test, authorisation test, duplicate-delivery test, and operational evidence.

## TOGAF 10 alignment

The catalogue is a Requirements Management control and a content-framework artefact. It keeps requirements current across ADM iterations, supports impact assessment when circumstances change, and provides traceability from stakeholder need to architecture, implementation, and governance evidence.
