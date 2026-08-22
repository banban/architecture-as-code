# Architecture Repository

Version: `[version]`  
Date: `[date]`  
Organisation: `[Organisation]`  
Capability: `[Capability]`  
Status: `[status]`

## Purpose

Index authoritative architecture evidence, reusable assets, standards, governance records, and solution landscape material.

## Repository principles

- Every important claim has an owner, source, review date, and confidence.
- A link to evidence is preferred to copying evidence.
- Superseded material is retained with status and replacement reference.
- Secrets, credentials, personal data, and environment-specific access details are stored only in approved systems.

## Architecture landscape

| Area | Artefact or location | Authority | Owner | Review date |
|---|---|---|---|---|
| `[business/data/application/technology]` | `[link/path]` | `[authoritative/reference]` | `[role]` | `[date]` |

## Reference and standards libraries

| ID | Standard/reference | Version | Applicability | Link |
|---|---|---|---|---|
| `STD-[nnn]` | `[name]` | `[version]` | `[scope]` | `[URL/path]` |

## Governance repository

List ADRs, approvals, exceptions, compliance assessments, review records, and architecture contracts.

## Solutions landscape

| Solution/component | Purpose | Lifecycle | Owner | Related interfaces/data |
|---|---|---|---|---|
| `[component]` | `[purpose]` | `[planned/current/retired]` | `[role]` | `[IDs]` |

## External repositories and capability

Record external dependencies, access method, licence, trust level, skills, and ownership without embedding credentials.

## Example

`REF-001` points to the approved integration pattern catalogue; `STD-001` points to the organisation's identity standard; `ADR-001` records the decision to use asynchronous messaging; and `EVID-001` points to the test and approval record. The repository stores links and metadata, not secrets.

## TOGAF 10 alignment

This is the Architecture Repository control point. It supports the Preliminary Phase, Enterprise Continuum classification, reuse of reference and building-block assets, governance, and retention of architecture knowledge across ADM cycles.
