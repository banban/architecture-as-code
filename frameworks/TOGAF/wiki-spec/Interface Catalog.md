# Interfaces

Version: `[version]`  
Date: `[date]`  
Organisation: `[Organisation]`  
Capability: `[Capability]`  
Status: `[status]`

## Catalogue authority and evidence boundary

This catalogue is authoritative for interface IDs, source/target relationships, interaction facts, contracts, and technical evidence. Use `[Unknown]` where evidence is missing; do not infer values.

## Interface register

| Interface ID | Name | Producer | Consumer | Pattern/channel | Frequency | Data | Owner | Status | Evidence |
|---|---|---|---|---|---|---|---|---|---|
| `INT-[nnn]` | `[name]` | `[system/team]` | `[system/team]` | `[API/event/file/batch]` | `[schedule]` | `[DATA-ID]` | `[role]` | `[status]` | `[link]` |

## Contract and security detail

For each interface record schema/version, endpoint or route reference, authentication, authorisation, encryption, validation, error handling, retry, idempotency, throttling, correlation, observability, retention, and recovery.

## Interaction groups and patterns

Group interfaces by business capability, bounded context, channel, producer, consumer, or lifecycle. Explain the selected integration pattern and alternatives considered.

## Remediation priorities

| Interface ID | Finding | Priority | Disposition | Work package |
|---|---|---|---|---|
| `INT-[nnn]` | `[finding]` | `[priority]` | `[retain/remediate/migrate/retire]` | `[WP-ID]` |

## Flow views

Add context, flow, and sequence diagrams using placeholders. Do not include live URLs, credentials, IP addresses, personal data, or exported configuration.

## Example

`INT-001` represents `[System A] → [Integration Service] → [System B]` using an authenticated event. The catalogue records the contract version, producer and consumer owners, retry and duplicate rules, data classification, monitoring, and a link to the approved test evidence.

## TOGAF 10 alignment

This supports Information Systems Architecture, especially application interaction, integration services, and data exchange views. It provides traceable content for Phases C and D and evidence for Opportunities and Solutions, Migration Planning, and Implementation Governance.
