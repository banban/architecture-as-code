# TOGAF 10 — Guidance for AI Agents & Autonomous Systems

> **Purpose:** Guidance for AI agents, autonomous systems, and human-AI teams operating within a TOGAF-governed enterprise. Defines how architectural principles apply to AI-assisted development, decision-making, and governance. Use this file to keep AI-driven project work aligned with business and architectural intent.

---

## Architecture in the Autonomous Age

The TOGAF 10 standard acknowledges a fundamental paradigm shift:

> *"We perfected data architecture... Now we need decision architecture. The enterprise is no longer centralised. It's becoming a network of decision points. The system is no longer passive. It is participating in the execution. Autonomy without architecture is chaos at scale."*

This reframes the role of Enterprise Architecture:
- We are no longer just **structuring systems** — we are **shaping behaviour**
- We are not replacing EA — we are **extending it for the autonomous age**
- Execution is no longer purely human: moving from centralised control to **distributed decisioning**
- The best architects design **how work happens**, including work performed by agents

---

## Harness Engineering

**Harness Engineering** is the discipline of designing the systems, constraints, and feedback loops surrounding AI agents to make them reliable in production.

### Core Activities
- Build infrastructure tools, guardrails, and observability that enable agents to act safely and effectively
- Shift focus from merely *prompting* to *engineering the environment*
- Define control surfaces: what agents can access, modify, and decide autonomously

### Architectural Responsibilities
Agents operating in a TOGAF-governed enterprise must be governed the same way any other architectural component is governed:

| Concern | Architecture Response |
|---|---|
| What can the agent do? | Architecture Building Blocks (ABBs) define capability boundaries |
| How is output quality assured? | Architecture Requirements Specification (ARS) defines measurable criteria |
| How are changes controlled? | Architecture Change Management (Phase H) governs agent updates |
| Who is accountable? | Architecture Governance (Phase G) defines accountability (RACI) |
| How is compliance assured? | Compliance Assessment levels applied to agent behaviour |

---

## Applying the ADM to AI-Assisted Projects

AI agents participating in architecture or development work must respect the ADM process. The following guidance applies:

### Phase A — Architecture Vision
- AI agents must not define architectural scope independently; scope is determined through stakeholder engagement and formal Architecture Vision development
- All agent-generated artefacts are subject to the same stakeholder review and endorsement as human-produced artefacts
- Architecture Vision must include AI components if they are part of the Target Architecture

### Phase B — Business Architecture
- AI agents must align all technical recommendations to the current and target Business Architecture
- Business capabilities are defined by humans through the Business Capabilities Catalog; agents operate within those capabilities
- Value streams are specified from the standpoint of the customer — agents must not redefine value without stakeholder agreement

### Phase C — Information Systems Architecture
- AI agents processing or generating data must be mapped in the Data Architecture (Data Entity Catalog, Data Lifecycle Diagram, Data Security Diagram)
- ABF-to-microservices mappings apply to AI agent services; each agent should be traceable to an Atomic Business Function
- Security classification of all data consumed or produced by agents must be defined

### Phase D — Technology Architecture
- AI model infrastructure (compute, storage, network) must appear in the Technology Architecture
- Technology Standards Catalog must include approved AI/ML platforms, frameworks, and versions
- Environments and Locations Diagrams must reflect where agents execute

### Phase E — Opportunities and Solutions
- AI components are evaluated as Solution Building Blocks (SBBs) conforming to ABBs
- Cynefin framework applies to AI-driven work: complex or chaotic domains favour iterative, Agile-aligned AI approaches
- Transition Architectures must account for incremental agent capability deployment

### Phase F — Migration Planning
- AI agent deployment is a work package; must be assigned business value and included in the Implementation and Migration Plan
- Change management must address organisational readiness for AI-assisted workflows

### Phase G — Implementation Governance
- AI agents must be subject to Compliance Assessment (Irrelevant → Fully Conformant)
- Architecture Contract must specify expected agent behaviour, quality thresholds, and escalation paths
- Ongoing monitoring of agent outputs against the Architecture Requirements Specification

### Phase H — Architecture Change Management
- Changes to AI agent behaviour, models, or scope trigger a Change Request
- Agent model updates (retraining, fine-tuning, replacement) are architecture changes and must go through Change Management
- Rollback plans must be defined for all agent deployments

---

## Minimum Viable Architecture for AI Projects

Each sprint in an AI-driven project must deliver a **Minimum Viable Architecture (MVA)**:

- The minimum architecture that is realisable and adds business value
- Includes: defined ABBs, identified risks, initial compliance posture, stakeholder-approved scope
- Does **not** mean incomplete governance — MVA still requires principles, constraints, and compliance intent to be documented

---

## Architecture Principles for AI Systems

The following Architecture Principles apply specifically to AI agents and autonomous systems:

### 1. Transparency
**Statement:** All AI agent decisions and actions must be traceable, explainable, and auditable.
**Rationale:** Architecture Governance requires accountability. Opaque agent behaviour cannot be governed.
**Implications:** All agent outputs must include decision context. Observability must be built in from the start.

### 2. Human Oversight at Boundaries
**Statement:** Decisions that cannot be rolled back must escalate to human stakeholders.
**Rationale:** Jeff Bezos principle: reversible decisions can be delegated; irreversible decisions require broader stakeholder involvement.
**Implications:** Agent workflows must classify decisions by reversibility. Escalation paths must be defined in the Architecture Contract.

### 3. Alignment to Business Capabilities
**Statement:** Every agent function must be traceable to a defined Business Capability or Atomic Business Function.
**Rationale:** Architecture ensures business alignment. Agents operating outside defined capabilities are ungoverned.
**Implications:** ABF-to-agent mapping must be maintained. New agent capabilities require Business Architecture review.

### 4. Security by Design
**Statement:** Security architecture is applied to all AI components from the outset.
**Rationale:** Security Architecture is a concern that exists in reference to all other domains. It cannot be retrofitted.
**Implications:** Data classification, access controls, and threat models must be defined for all agent interactions with data.

### 5. Interoperability
**Statement:** AI agents must exchange data and services using approved, documented interfaces.
**Rationale:** Interoperability ensures the ability to share operations, data, and services across systems and stakeholders.
**Implications:** All APIs consumed or exposed by agents must be catalogued in the Interface Catalog.

### 6. Technology Independence (Avoid Lock-in)
**Statement:** AI component design must not create unsustainable dependency on a single vendor or model.
**Rationale:** Technology independence manages the risk of technical debt.
**Implications:** Abstraction layers, model interoperability standards, and exit strategies must be documented.

---

## DevSecOps and AI Agents

**DevSecOps** — the mindset that "everyone is responsible for security" — applies fully to AI agent development:

- Security decisions are distributed to those with the highest level of context
- In AI workflows, this means: model developers, deployment engineers, and data stewards all share security responsibility
- **Leverage Automation:** Infrastructure as Code and Policy as Code must enforce governance automatically
- Security controls are Architecture Building Blocks (ABBs); they must be catalogued in the Security Services Catalog

---

## Stakeholder Engagement for AI Architecture

Stakeholder engagement for AI systems is not a soft skill — it is a survival skill:

- Every major business decision involving AI shapes the security and risk landscape
- Executives influence funding and priorities; they must be engaged early on AI architecture decisions
- The Power/Interest Matrix applies:
  - **Custodians** (high power, high interest): must actively govern AI components
  - **Owners** (high power, low interest): must be kept satisfied regarding AI impact on their domain
- Architecture is never sold to a stakeholder; AI capability benefits must be demonstrated through value delivery, not persuasion

---

## No-Regret Decisions for AI Projects

In AI-driven architecture work, **no-regret decisions** are those that work well in all scenarios:

- Choose open, documented standards over proprietary ones where possible
- Design for observability and reversibility from the start
- Deliver architecture incrementally through Transition Architectures
- Prioritise business capability alignment over technical sophistication

> *"Inspiration is a discipline about cultivating the inputs to thinking, because it affects the outputs. Creativity is doing more than the first thing you think of."*

---

## Checklist: AI Agent Architecture Review

Before deploying or updating an AI agent, verify:

- [ ] Agent capabilities mapped to ABBs and Business Capabilities Catalog
- [ ] Data consumed and produced catalogued in Data Architecture artefacts
- [ ] Security classification applied to all data interactions
- [ ] Interfaces catalogued in the Interface Catalog
- [ ] Technology platform listed in Technology Standards Catalog
- [ ] Architecture Requirements Specification defines measurable quality thresholds
- [ ] Architecture Contract specifies expected behaviour and escalation paths
- [ ] Rollback plan documented
- [ ] Compliance Assessment level determined (target: Fully Conformant)
- [ ] Architecture Change Request raised for any post-deployment modifications
- [ ] OKRs and CSFs defined to measure business value delivered

---

*Source: TOGAF 10 Standard Knowledge Base — Terms, ADM, Content Framework Sheets; extended for autonomous systems guidance*
