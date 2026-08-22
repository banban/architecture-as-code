# Transition Architecture

Version: `[version]`  
Date: `[date]`  
Organisation: `[Organisation]`  
Capability: `[Capability]`  
Status: `[status]`

## Purpose and boundary

Document controlled states between the current and target architecture, including temporary dependencies, compensating controls, risks, owners, and exit criteria.

## Transition context

Describe the baseline, target, drivers, sequencing constraints, and why the target cannot be adopted immediately.

## Transition principles

- Make interim dependencies explicit and time-bound.
- Minimise blast radius and avoid creating permanent temporary solutions.
- Protect data and credentials at every state.
- Require evidence before progressing to the next state.

## Current-to-future gaps

| Gap ID | Current | Target | Interim treatment | Exit condition |
|---|---|---|---|---|
| `GAP-[nnn]` | `[current]` | `[target]` | `[control]` | `[evidence]` |

## Interim plug register

| Plug ID | Temporary resource/path/dependency | Affected interface | Risk | Owner | Start | Exit work package | Status |
|---|---|---|---|---|---|---|---|
| `PLUG-[nnn]` | `[description]` | `[INT-ID]` | `[risk]` | `[role]` | `[date]` | `[WP-ID]` | `[status]` |

## Transition states

| State | Capability available | Controls | Evidence gate | Entry/exit criteria |
|---|---|---|---|---|
| `T-[nnn]` | `[capability]` | `[controls]` | `[evidence]` | `[criteria]` |

## Work package portfolio

| Work package | Outcome | Dependencies | Owner | Acceptance |
|---|---|---|---|---|
| `WP-[nnn]` | `[outcome]` | `[dependencies]` | `[role]` | `[evidence]` |

## Interim plug decision template

Record context, alternatives, approval, security/privacy controls, monitoring, rollback, expiry/review date, and target-state exit evidence for every plug.

## Governance

Define review authority, escalation, change control, evidence retention, and conditions that require an ADR or architecture review.

## Example

Transition state `T-001` continues a controlled file exchange for one release while the target API is built. The interim plug has an owner, encryption, monitoring, limited retention, a rollback procedure, and an expiry date. Exit requires the target API contract and reconciliation tests to pass.

## TOGAF 10 alignment

This supports Phases E and F by defining transition architectures, opportunities, solution increments, work packages, and migration sequencing. It also supports Phase G by making interim controls and exit evidence explicit.
