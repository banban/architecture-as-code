# Architecture Requirements Specification

Version: `[version]`  
Date: `[date]`  
Organisation: `[Organisation]`  
Capability: `[Capability]`  
Status: `[status]`

## Purpose

State the measurable requirements that implementation must satisfy. Keep detailed requirement ownership in `Requirements Catalog.md`.

## Inputs and outputs

| Input | Source | Output or decision |
|---|---|---|
| `[input]` | `[source]` | `[output]` |

## Success measures

| ID | Measure | Target | Verification method |
|---|---|---|---|
| `NFR-[nnn]` | `[measure]` | `[target]` | `[test/evidence]` |

## Business and application service contracts

For each service define purpose, consumer, provider, interface, data, error behaviour, security, availability, support, and versioning expectations.

## Implementation and standards requirements

Cover architecture principles, interoperability, naming, configuration, infrastructure as code, CI/CD, testing, secrets, logging, monitoring, recovery, accessibility, and change control. Reference approved organisational standards rather than embedding client-specific rules.

## Resource naming convention requirements

`[Define a parameterised convention: organisation/workload/environment/region/resource/instance. Do not include secrets or personal information.]`

## Constraints and assumptions

| Type | ID | Statement | Validation or expiry |
|---|---|---|---|
| `[constraint/assumption]` | `[ID]` | `[statement]` | `[action/date]` |

## Example

`NFR-001`: The interface shall process 95% of valid messages within `[duration]` under `[load]`, and shall expose failed messages for replay within `[recovery objective]`. Verification is an automated performance and recovery test linked from the release evidence.

## TOGAF 10 alignment

This artefact supports Requirements Management throughout the ADM cycle. It converts stakeholder concerns and architecture principles into testable constraints and service contracts that can be checked during design, migration, implementation governance, and change management.
