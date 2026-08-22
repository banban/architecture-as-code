# Architecture Definition

Version: `[version]`  
Date: `[date]`  
Organisation: `[Organisation]`  
Capability: `[Capability]`  
Status: `[status]`

## Purpose

Define the baseline, target, and transition architecture for `[Capability]`, with traceable principles, constraints, decisions, and gaps.

## Scope and traceability

State the business, data, application, technology, security, operations, and environment boundaries. Link to `REQ-*`, `INT-*`, `DATA-*`, `ADR-*`, `RISK-*`, and `WP-*` records.

## Goals, objectives and constraints

| Goal/objective | Measure | Constraint or dependency |
|---|---|---|
| `[goal]` | `[measure]` | `[constraint]` |

## Architecture principles

| ID | Principle | Rationale | Implication | Exception process |
|---|---|---|---|---|
| `PR-[nnn]` | `[principle]` | `[why]` | `[impact]` | `[process]` |

## Baseline architecture

Describe the current capabilities, systems, interfaces, data stores, channels, identities, environments, operational processes, known evidence gaps, and technical debt. Do not infer undocumented facts.

## Target architecture

### Business architecture

`[Capabilities, value streams, organisation, processes, ownership.]`

### Data architecture

`[Data entities, systems of record, classification, quality, lineage, retention, and stewardship.]`

### Application architecture

`[Applications, services, integration patterns, APIs, events, workflows, and responsibilities.]`

### Technology architecture

`[Runtime, networking, storage, identity, security controls, observability, deployment, and resilience.]`

## Delivery architecture

| Concern | Target approach | Owner | Evidence |
|---|---|---|---|
| Delivery | `[pipeline and promotion model]` | `[role]` | `[link]` |
| Operations | `[support, alerting, recovery]` | `[role]` | `[link]` |

## Gap and impact analysis

| Gap | Current state | Target state | Impact | Remediation reference |
|---|---|---|---|---|
| `GAP-[nnn]` | `[baseline]` | `[target]` | `[impact]` | `[WP/ADR]` |

## Transition architecture

Summarise each sanctioned interim state and link to the detailed Transition Architecture. Include compensating controls and exit criteria.

## Current open decisions

| ID | Decision | Options | Owner | Due | Status |
|---|---|---|---|---|---|
| `ADR-[nnn]` | `[decision]` | `[options]` | `[role]` | `[date]` | `[status]` |

## Example

Baseline: `[System A]` sends a nightly file to `[System B]` with no replay mechanism. Target: an authenticated API or message exchange with schema validation, correlation IDs, monitoring, and a documented recovery procedure. Gap `GAP-001` is addressed by work package `WP-001`.

## TOGAF 10 alignment

This document combines the baseline and target views produced across Phases B, C, and D, then records the gaps and transition implications that feed Phases E and F. Use stakeholder views and reusable Architecture Building Blocks where appropriate, while leaving implementation-specific Solution Building Blocks to delivery artefacts.
