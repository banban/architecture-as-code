# TOGAF 10 — Architecture Governance & Compliance

> **Purpose:** Reference for governance structures, compliance assessment levels, and the principles that govern how architecture decisions are made, monitored, and enforced across the enterprise. Use this to design governance frameworks, conduct compliance reviews, and manage architectural contracts.

---

## What Is Architecture Governance?

Architecture Governance is the practice of monitoring and directing architecture-related work to:
- Deliver desired outcomes
- Adhere to relevant principles, standards, and roadmaps
- Ensure accountability, responsibility, transparency, and fairness

> **ISO/IEC 38500 definition:** A system that directs and controls the current and future state.
>
> The key difference between **governance** and **management** rests on fiduciary and sustainable responsibility. Governance sets the direction; management executes within it.

---

## Architecture Governance Framework

### Conceptual Structure

The Architecture Governance Framework operates at multiple tiers:

| Tier | Scope |
|---|---|
| Corporate Governance | Enterprise-wide policies, legal, regulatory compliance |
| EA Governance | Architecture principles, standards, and roadmap compliance |
| Business Governance | Business process and policy alignment |
| Domain Governance | Specific domain (Data, Application, Technology, Security) standards |
| Implementation Governance | Project-level conformance, Architecture Contracts |

### Organisational Structure

The Architecture Board is central to governance. Its responsibilities include:
- **Accountability** — owning architectural decisions and outcomes
- **Responsibility** — ensuring compliance with approved architectures
- **Transparency** — communicating decisions and rationale
- **Fairness** — consistent application of standards across projects

### External and Internal Interactions Affecting Governance

Governance must account for both:
- **Internal interactions:** Business units, IT teams, project teams, EA teams
- **External interactions:** Regulatory bodies, industry standards, partner/vendor architectures

---

## Compliance Assessment

### Purpose

A periodic review completed during implementation to ensure the original Architecture Vision is appropriately realised. Best practice is to go beyond simple compliance with the statement to include **compliance with intent** (linked to the Architecture Contract).

### Compliance Levels

| Level | Definition |
|---|---|
| **Irrelevant** | The implementation has no features in common with the architecture specification (conformance question does not arise) |
| **Consistent** | Some features in common, implemented in accordance with the specification; however, some specified features are not implemented and the implementation has other unspecified features |
| **Compliant** | Some specified features are not implemented, but all implemented features are covered by the specification and implemented in accordance with it |
| **Conformant** | All specified features are implemented in accordance with the specification, but some additional features are implemented that are not in accordance with it |
| **Fully Conformant** | Full correspondence: all specified features implemented in accordance with the specification; no features implemented outside the specification |
| **Non-conformant** | Any of the above where some specified features are implemented *not* in accordance with the specification |

> **Compliance reviews that indicate an implementation will fail to enable expected value are key inputs to future architecture development.**

---

## Architecture Contracts

Architecture Contracts are joint agreements between development partners and sponsors on the deliverables, quality, and fitness-for-purpose of an architecture.

### Purpose
- Direct and control implementation teams toward a well-considered future
- Protect the expected value of the Target Architecture
- Link constraints to stakeholder requirements, enabling compliance assessments to evaluate how well design and implementation choices deliver expected value

### Types of Contract
- **Architecture Contract** — between EA function and implementation teams
- **Business User Contract** — agreement with business stakeholders on outcomes

### Every Phase May Require Different Contracts
The EA function enters into contracts at multiple points:
- Phase A: Statement of Architecture Work (SAW) — scope and approach agreement
- Phase F: Architecture Contract — implementation commitment
- Phase G: Compliance review against Architecture Contract

---

## Architecture Principles Governance

### Structure of a Principle

Every architecture principle must contain three components:

**1. Statement**
- Succinctly and unambiguously communicates the fundamental rule
- Must be unambiguous — no room for conflicting interpretations

**2. Rationale**
- Highlights business benefits of adhering to the principle
- Describes relationships to other principles
- States precedence rules (when one principle takes priority over another)
- Uses business terminology, not technical jargon

**3. Implications**
- Highlights requirements for the business and IT (resources, costs, activities)
- Clearly states the impact to the business and consequences of adoption
- Answers: "How does this affect me?"
- Identifies current systems, standards, or practices that may be incongruent

### Sample Governance Principles Areas
- **Data Stewardship:** Data is a valuable enterprise asset; cultural shift from "data ownership" to "data stewardship" thinking
- **Technology Independence:** Manage the risk of technical debt
- **Ease of Use:** The more a user must understand underlying technology, the less productive they are

---

## GRC — Governance, Risk, and Compliance

### GRC Scoring
Architecture governance integrates with enterprise GRC. Key frameworks:

| Framework | Domain |
|---|---|
| ISO 31000 | Risk Management Standard |
| ISO 38500 | IT Governance Framework |
| ISO 27001 | Information Security Management |
| ISO 12207 | Software Life Cycle Processes |
| ISO 15704 / ISO 42010 | Enterprise Modelling and Architecture |
| Open FAIR™ | Risk Analysis |
| SABSA | Security Architecture and Risk |

### Risk Assessment in Governance
- Determines risks relevant to an asset or objective
- Measures likelihood and impact
- Accepts, mitigates, or transfers risk according to the organisation's risk appetite
- A deliverable of a qualitative and quantitative risk assessment is the **Business Risk Model**

### Risk Migration Plan / ERM
Contains activities to mitigate risks through:
- Increasing the level of control
- Transferring risk to another party
- Avoiding by changing business activity
- Delaying or compensating risk

**Operational risk** — the risks a business faces in day-to-day operations based on operational capabilities produced as the result of EA work.

---

## Stakeholder Governance — Power/Interest Matrix

Stakeholders are classified by their power and interest to determine governance engagement:

| Classification | Power | Interest | Role |
|---|---|---|---|
| **Custodians** | High | High | Active oversight; must be managed closely |
| **Owners** | High | Low | Must be kept satisfied |
| Gatekeepers | Varies | High | Keep informed |

> Architecture is never *sold* to a stakeholder. Stakeholder preferences are never manipulated. The role of the Practitioner is to assist stakeholders in understanding what they must give up to realise different sets of preferences.

---

## Implementation Governance

### Phase G Activities
- Ensure all changes are within the scope of the Target Architecture
- Risk/Compliance Assessment against SLAs/OLAs, standards, and regulatory requirements
- Identify who is responsible, involved, and accountable (RACI)
- Guide development of solution deployment
- Post-implementation review to close the implementation
- Capture reusable ABBs and SBBs with their relationships

### Architecture Board Responsibilities
- **Accountability** — own and stand behind architectural decisions
- **Responsibility** — ensure implementations comply with approved architecture
- **Transparency** — publish decisions, rationale, and architectural guidance
- **Fairness** — apply governance standards consistently

---

## Governance Inputs and Triggers

### Change Management Triggers (Phase H)
- Request from Sponsor via EA team
- Request from business sponsor stakeholder (top-down)
- Request by Data Architect discovery opportunity (bottom-up)
- Request from market/contractor/partner
- Request due to environment change
- Request from Governance
- Request to solve implementation/performance issues

### Change Types
| Change Type | Flow | Description |
|---|---|---|
| Re-architecture | H → G | Large incremental change requiring full governance |
| Simplification | Small loop | Small incremental, low-impact change |
| Disciplinary | G → H | Dispensation, Exemption, or compliance breach |

---

## Delegation Framework (Management 3.0)

Seven levels of delegation governing architectural decision-making between Agile teams:

| Level | Description |
|---|---|
| **Tell** | Architecture team makes the decision and informs |
| **Sell** | Architecture team decides but explains reasoning |
| **Consult** | Architecture team seeks input before deciding |
| **Agree** | Architecture team and project teams decide together |
| **Advise** | Architecture team advises; teams decide |
| **Inquire** | Teams decide; architecture team may ask |
| **Delegate** | Teams decide independently |

> **Jeff Bezos principle:** Where decisions can be rolled back, delegate to individual teams. Where decisions cannot be rolled back, they must be made by a larger group of stakeholders including all Agile teams.

---

## Strategic Fit

Based upon the overall EA (all tiers), Strategic Fit is the critical factor for:
- Allowing approval of any new project or initiative
- Determining the value of any deliverable

Every project must be assessed for strategic fit before initiation. Architecture contracts and compliance reviews enforce this throughout the lifecycle.

---

*Source: TOGAF 10 Standard Knowledge Base — ADM, ASF, Terms Sheets*
