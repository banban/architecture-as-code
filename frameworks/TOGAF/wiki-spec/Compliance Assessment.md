# Compliance Assessment

Version: `[version]`  
Date: `[date]`  
Organisation: `[Organisation]`  
Capability: `[Capability]`  
Status: `[status]`

## Purpose and boundary

Assess conformance of the architecture, implementation, operations, and delivery evidence against approved principles, standards, requirements, and controls.

## Assessment basis

| Basis | Version/owner | Applicability | Evidence |
|---|---|---|---|
| `[standard/policy/requirement]` | `[version]` | `[scope]` | `[link]` |

## Compliance summary

Use a declared scale, for example: `Not assessed → Non-conformant → Partially conformant → Conformant → Fully conformant`.

| Domain | Rating | Finding summary | Required action | Owner |
|---|---|---|---|---|
| `[security/data/technology/operations/etc.]` | `[rating]` | `[summary]` | `[action]` | `[role]` |

## Checklist

Review applicable controls for platform services, applications, information management, identity and access, security, system management, resilience, methods, tools, and governance.

| Control ID | Control/question | Evidence | Result | Finding/reference |
|---|---|---|---|---|
| `CTRL-[nnn]` | `[question]` | `[link]` | `[pass/fail/partial/N/A]` | `[finding]` |

## Findings and readiness gate

| Finding | Severity | Remediation | Exit evidence | Gate decision |
|---|---|---|---|---|
| `FIND-[nnn]` | `[severity]` | `[action]` | `[evidence]` | `[decision]` |

## Open compliance questions and references

`[Questions, exceptions, waivers, expiry dates, and source links.]`

## Example

Finding `FIND-001`: the proposed interface has no documented replay control. Result: Partially conformant. Remediation: define duplicate handling, operator permissions, retention, and a tested replay procedure. The gate remains open until evidence is reviewed by `[role]`.

## TOGAF 10 alignment

This supports Implementation Governance and architecture compliance reviews. It connects principles, standards, requirements, risks, and evidence to a formal conformance decision and records exceptions with owners and expiry dates.
