# Architecture Decision Records

Version: `[version]`  
Date: `[date]`  
Organisation: `[Organisation]`  
Capability: `[Capability]`

## ADR register

| ID | Title | Status | Date | Decision owner | Related requirements/risks |
|---|---|---|---|---|---|
| `ADR-[nnn]` | `[short title]` | `[proposed/accepted/rejected/superseded]` | `[date]` | `[role]` | `[IDs]` |

## ADR-[nnn] `[Decision title]`

### Context

`[Describe the problem, forces, evidence, constraints, and options. Separate facts from assumptions.]`

### Decision

`[State the selected option and any conditions, boundaries, or exceptions.]`

### Alternatives considered

| Option | Benefits | Costs/risks | Reason not selected |
|---|---|---|---|
| `[option]` | `[benefit]` | `[cost/risk]` | `[reason]` |

### Consequences

Describe positive, negative, operational, security, cost, delivery, data, and lifecycle consequences.

### Implementation and review

| Action | Owner | Due | Evidence | Review/expiry |
|---|---|---|---|---|
| `[action]` | `[role]` | `[date]` | `[link]` | `[date]` |

## Example

`ADR-001` selects asynchronous messaging for a high-volume exchange because the producer and consumers must be independently available. The decision is accepted subject to schema governance, duplicate handling, monitoring, and a recovery test.

## TOGAF 10 alignment

ADRs provide governance and decision traceability across the ADM. They preserve rationale, alternatives, consequences, and review conditions so that architecture compliance and Change Management can evaluate whether a decision remains valid.
