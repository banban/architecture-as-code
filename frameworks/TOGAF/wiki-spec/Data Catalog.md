# Data Catalog

Version: `[version]`  
Date: `[date]`  
Organisation: `[Organisation]`  
Capability: `[Capability]`  
Status: `[status]`

## Purpose and authority

Identify data entities and logical/physical data components relevant to `[Capability]`. State which source is authoritative for business definitions, technical metadata, and classification.

## Data entities

| Data ID | Entity | Definition | System of record | Classification | Steward | Retention | Interfaces |
|---|---|---|---|---|---|---|---|
| `DATA-[nnn]` | `[entity]` | `[definition]` | `[system]` | `[classification]` | `[role]` | `[rule]` | `[INT-IDs]` |

## Logical data components

| Component ID | Component | Responsibility | Lifecycle | Consumers | Evidence |
|---|---|---|---|---|---|
| `LDC-[nnn]` | `[component]` | `[purpose]` | `[lifecycle]` | `[consumers]` | `[link]` |

## Physical data components

Record technology, environment, location reference, ownership, access model, backup/recovery, and sensitivity. Refer to controlled configuration for exact resource names.

## Lineage and platform mapping

Describe source-to-target flows, transformations, landing zones, data quality controls, cataloguing, access, and downstream use. Link to interface and requirement IDs.

## Data risks and observations

| ID | Observation/risk | Impact | Action | Owner |
|---|---|---|---|---|
| `DATA-RISK-[nnn]` | `[statement]` | `[impact]` | `[action]` | `[role]` |

## Example

`DATA-001` is `[Business Entity]`, classified `[classification]`, mastered by `[System of Record]`, and exchanged through `INT-001`. The catalogue records its steward, retention rule, lineage, quality checks, authorised consumers, and the evidence supporting the classification.

## TOGAF 10 alignment

This supports the Data Architecture part of Information Systems Architecture. It provides a reusable, governed view of information entities and their relationships to applications, interfaces, technology components, requirements, and business ownership.
