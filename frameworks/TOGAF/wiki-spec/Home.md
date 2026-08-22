# Wiki Specification Pack

Version: `[version]`  
Date: `[date]`  
Organisation: `[Organisation]`  
Capability: `[Capability]`  
Status: `[Draft | In review | Approved | Superseded]`

## Purpose

This pack records the architecture, requirements, evidence, decisions, transition states, delivery roadmap, and communications for `[Capability]`.

## Document roles

| Document | Authority |
|---|---|
| Vision | Case for change, outcomes, scope, and stakeholder concerns |
| Definition | Baseline, target architecture, principles, and architecture gaps |
| Requirements Catalog | Requirement IDs, priorities, sources, and acceptance measures |
| Interface Catalog | Interface facts and technical evidence |
| Data Catalog | Data assets, ownership, classification, and lineage |
| ADRs | Decision status, rationale, and consequences |
| Transition Architecture | Interim states, controls, and exit criteria |
| Roadmap | Priorities, work packages, dependencies, and sequencing |
| Implementation and Migration Plan | Release, migration, readiness, and acceptance |

## Cross-reference rules

- Use stable IDs such as `REQ-[nnn]`, `INT-[nnn]`, `DATA-[nnn]`, `ADR-[nnn]`, `RISK-[nnn]`, and `WP-[nnn]`.
- Link to the authoritative document rather than copying detailed facts.
- Identify the evidence source, owner, review date, and confidence for material claims.
- Record exceptions and unresolved questions explicitly.

## Open questions

| ID | Question | Owner | Due | Decision/evidence |
|---|---|---|---|---|
| Q-[nnn] | `[question]` | `[role]` | `[date]` | `[link or outcome]` |

## Example

For a small project, the pack might contain `REQ-001` for a business outcome, `INT-001` for a source-to-consumer interface, `DATA-001` for the exchanged business entity, and `ADR-001` for the selected interaction pattern. Each record links to the others and records an owner and evidence location.

## TOGAF 10 alignment

Use this page as the pack entry point and architecture repository index. It supports the Preliminary Phase by defining how architecture work is organised, Requirements Management through stable traceability, and the content framework by identifying each deliverable and its authority.
