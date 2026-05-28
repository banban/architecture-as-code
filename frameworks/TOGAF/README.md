# TOGAF 10 — Architecture Knowledge Base

> **Trusted source of truth for Enterprise Architecture guidance, aligned with the TOGAF 10 Standard.**
>
> This knowledge base is intended for use by human architects, project teams, and AI agents to keep project development aligned with architecture principles and business objectives.

---

## Knowledge Base Structure

| File | Contents | Primary Use |
|---|---|---|
| [`01-glossary.md`](./01-glossary.md) | Definitions of all TOGAF 10 terms | Look up any TOGAF concept; ensure consistent terminology across teams |
| [`02-adm-phases.md`](./02-adm-phases.md) | ADM phase-by-phase guide: purpose, activities, and outputs | Plan and execute architecture projects; identify which phase produces which artefact |
| [`03-governance-compliance.md`](./03-governance-compliance.md) | Governance structures, compliance levels, Architecture Contracts, risk frameworks | Design governance models; conduct compliance reviews; manage architectural risk |
| [`04-content-framework-artefacts.md`](./04-content-framework-artefacts.md) | TOGAF Content Framework, Architecture Repository, artefact catalogue by phase | Ensure correct artefacts are produced; understand how artefacts relate to each other |
| [`05-architecture-skills-framework.md`](./05-architecture-skills-framework.md) | Architect roles (Enterprise, Segment, Solution), skills categories, EQ, mentoring | Define team capabilities; assign work appropriately; develop architectural skills |
| [`06-project-lifecycle-methodology.md`](./06-project-lifecycle-methodology.md) | ADM mapped to PRINCE2 and PMBOK; IT4IT to ITIL4; Agile/Waterfall comparison | Integrate architecture work with existing PM methodologies; select delivery approach |
| [`07-ai-agent-architecture-guidance.md`](./07-ai-agent-architecture-guidance.md) | Guidance for AI agents operating within TOGAF-governed enterprise; principles and checklists | Govern AI components; keep AI-assisted development architecturally aligned |

---

## Quick Reference: Key TOGAF Concepts

### The Four Architecture Domains (BDAT)
| Domain | Describes |
|---|---|
| **Business** | Capabilities, value streams, organisational structure, processes |
| **Data** | Data entities, logical/physical data assets, data management |
| **Application** | Application structure, interaction, and business function support |
| **Technology** | Technology services, components, and infrastructure |

### ADM Phase Summary
```
Preliminary → A (Vision) → B (Business) → C (IS) → D (Technology)
                                                            ↓
Requirements Management ←————————————————————————————————
                                                            ↓
                          H (Change Mgmt) ← G (Governance) ← F (Migration) ← E (Opportunities)
```

### Building Block Types
| Type | Defines | Created In |
|---|---|---|
| ABB (Architecture Building Block) | The *what* — requirements | Phases B, C, D |
| SBB (Solution Building Block) | The *how* — implementation | Phase E |

### Compliance Assessment Levels
```
Irrelevant → Consistent → Compliant → Conformant → Fully Conformant
                                                    (Non-conformant at any level = fail)
```

---

## How to Use This Knowledge Base

### For Architecture Projects
1. Start with [`02-adm-phases.md`](./02-adm-phases.md) to understand what phase you are in and what is required
2. Use [`04-content-framework-artefacts.md`](./04-content-framework-artefacts.md) to identify the correct artefacts to produce
3. Check [`03-governance-compliance.md`](./03-governance-compliance.md) for compliance and review requirements
4. Reference [`01-glossary.md`](./01-glossary.md) to ensure consistent terminology in all documents

### For Governance Reviews
1. Apply compliance levels from [`03-governance-compliance.md`](./03-governance-compliance.md)
2. Verify artefact completeness against [`04-content-framework-artefacts.md`](./04-content-framework-artefacts.md)
3. Check Architecture Contract obligations

### For AI Agents
1. Review [`07-ai-agent-architecture-guidance.md`](./07-ai-agent-architecture-guidance.md) before taking any architectural action
2. Verify all actions are traceable to a defined Business Capability (from Business Architecture)
3. Apply the AI Agent Architecture Review Checklist before deploying or modifying any component
4. Raise Architecture Change Requests for any post-deployment changes

### For Team Capability
1. Use [`05-architecture-skills-framework.md`](./05-architecture-skills-framework.md) to map team skills to roles
2. Follow the Solution Architect Responsibilities Checklist for every engagement

---

## Guiding Principles

> *"Good Enterprise Architecture enables you to achieve the right balance between business transformation and continuous operational efficiency."*

> *"Without the EA, it is highly unlikely that all the concerns and requirements will be considered and addressed with an appropriate trade-off."*

> *"Architecture is never sold to a stakeholder. Stakeholder preferences are never manipulated."*

> *"Autonomy without architecture is chaos at scale."*

> *"EA is not all about definitions of trade-off criteria to reduce risk or cost. Understanding the organisation's objectives, legal environment, financial model, and operating model clarifies that trade-off decisions normally cover more than one dimension."*

---

## Source

This knowledge base was generated from the **TOGAF 10 Standard** reference workbook, covering:
- Terms and Definitions
- Content Framework
- Architecture Development Method (ADM)
- Architecture Project Management (APM)
- Architecture Skills Framework (ASF)

*Aligned with TOGAF® 10 Standard, published by The Open Group.*
---


