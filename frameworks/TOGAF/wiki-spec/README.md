# Wiki Specification Templates

This folder contains reusable, neutral templates for an integration architecture specification pack. The original project-specific documents remain in the parent folder.

## How to use

1. Copy this folder into a new architecture repository or project workspace.
2. Replace bracketed placeholders such as `[Organisation]`, `[Capability]`, `[System A]`, and `[Decision ID]`.
3. Remove guidance comments and sections that are not applicable.
4. Record evidence links, owners, dates, approvals, and status for every completed artefact.
5. Keep IDs stable and cross-reference them instead of duplicating facts.

## Pack contents

| Template | Primary purpose |
|---|---|
| Home | Pack index, document roles, and cross-reference rules |
| Statement of Architecture Work | Scope, approach, deliverables, and acceptance |
| Architecture Vision | Case for change, outcomes, and stakeholder concerns |
| Architecture Definition | Baseline, target, principles, and gaps |
| Architecture Requirements Specification | Measurable architecture and service requirements |
| Requirements Catalog | Traceable requirement register |
| Requirements Impact Assessment | Impact of new findings or scope changes |
| Capability Assessment | Current and target capability maturity |
| Compliance Assessment | Conformance, findings, and readiness gates |
| Architecture Repository | Index of authoritative evidence and reusable assets |
| Interface Catalog | Interface, producer, consumer, and channel inventory |
| Data Catalog | Data entities, ownership, classification, and lineage |
| Architecture Decision Records | Decision register and decision rationale |
| Transition Architecture | Interim states, controls, and exit criteria |
| Architecture Roadmap | Work packages, dependencies, and sequencing |
| Implementation and Migration Plan | Delivery waves, migration decisions, and acceptance |
| Communications Plan | Stakeholders, messages, channels, and cadence |

## Placeholder conventions

Use `[TBD]` only when an owner and due date are recorded. Use `[Unknown]` when evidence is missing. Never invent a value to complete a table. Mark sensitive values as references to an approved secret or configuration store; do not put credentials, tokens, private endpoints, or personal contact details in the artefacts.

## TOGAF 10 alignment

These templates use the TOGAF Standard, 10th Edition as a configurable framework. They support the ADM cycle from Preliminary and Requirements Management through Architecture Vision, Business, Information Systems, Technology, Opportunities and Solutions, Migration Planning, Implementation Governance, and Change Management. They also support the content framework, architecture repository, governance, reusable building blocks, and stakeholder-oriented views.

Tailor the pack to the engagement. Apply the relevant TOGAF Series Guides, organisational governance, modelling language, and delivery method rather than treating this document set as a mandatory sequence.
