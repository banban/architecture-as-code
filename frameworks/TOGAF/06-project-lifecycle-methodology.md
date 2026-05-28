# TOGAF 10 — Architecture Project Lifecycle & Methodology Mapping

> **Purpose:** Reference for mapping TOGAF ADM phases to standard project management methodologies (PRINCE2, PMBOK) and agile frameworks. Use this to integrate architecture work with existing project governance, and to understand how TOGAF concepts align with project management terminology.

---

## Architecture Project Lifecycle

An Architecture Project encompasses all activities within ADM Phases A through F, and Requirements Management for those phases. It may operate multiple ADM phases concurrently.

### Lifecycle Stages

| Architecture Project Stage | TOGAF ADM Phase | PRINCE2 Equivalent | PMBOK Equivalent |
|---|---|---|---|
| **Architecture Project Start-up** | Phase A — Establish an Architecture Project | Starting up the Project Process (all steps) | Initiation Process Group: §4.1 Develop Project Charter; §13.1 Identify Stakeholders |
| **Architecture Project Planning** | Phase A — Develop Statement of Architecture Work | Initiation Process: Create Project Plan, Assemble Project Initiation Documentation | Planning processes: create and collect Project Management Plan |
| **Planning a Stage** | Closing step of preceding phase | PRINCE2 stage management | Execute, Monitor, and Control Process Groups |
| **Execute, Monitor, and Control** | Each of Phases B to F | Controlling a Stage | Executing and Monitoring and Controlling Process Groups |
| **Ending a Stage** | Closing step of preceding phase | End Stage Report | No direct mapping |
| **Architecture Handover** | Phase F — closing steps | Closing the Project Process — hand over products | Closing the Project |

---

## Concept Mapping: TOGAF vs PRINCE2 vs PMBOK

| Concept | TOGAF Standard | PRINCE2 | PMBOK Guide |
|---|---|---|---|
| **Architecture Project** | All activities in ADM Phases A–F; may operate multiple phases concurrently | No corresponding definition | No corresponding definition |
| **Deliverable** | An architectural work product contractually specified, formally reviewed, agreed, and signed off by stakeholders | "Output" — a specialist product handed over to a user | Any unique and verifiable product, result, or capability produced to complete a process, phase, or project |
| **Executive / Sponsor** | Key concern: on-time, on-budget delivery of a change initiative that will realise expected benefits | Single individual with overall responsibility for ensuring project meets objectives and delivers projected benefits | Person or group who provides resources and support; accountable for enabling success |
| **Phase** | A collection of logically-related work within the ADM (e.g., Phase A — Architecture Vision) | No special meaning | A collection of logically-related project activities culminating in one or more deliverables |
| **Project Manager** | No special meaning | The person given authority and responsibility to manage the project on a day-to-day basis | The person assigned to lead the team responsible for achieving project objectives |
| **Risk** | Potential threat of the transformation to the technical environment and compliance | An event that, should it occur, will have an effect on achieving project objectives | An uncertain event or condition that, if it occurs, has a positive or negative effect on project objectives |
| **Scope** | Restricted to architecture scope: what is inside/outside the Baseline and Target Architecture efforts | Sum total of products and the extent of their requirements | The sum of products, services, and results to be provided |
| **Stage** | No defined meaning | A section of a project | No defined meaning |
| **Stakeholder** | An individual, team, organisation, or class having an interest in a system | Any individual, group, or organisation that can affect or be affected by an initiative | An individual, group, or organisation who may affect, be affected by, or perceive itself to be affected by a decision or outcome |
| **Work Package** | A set of actions to achieve one or more business objectives; can be part of a project, a complete project, or a programme | An input or output, tangible or intangible, that can be described in advance, created, and tested | Work defined at the lowest level of the WBS for which cost and duration can be estimated |

---

## IT4IT Value Streams Mapped to ITIL4 Value Chain

### Strategy to Portfolio (S2P) → ITIL4 Plan

**IT4IT:** Focuses on defining and managing the IT portfolio in alignment with business objectives. Covers: IT strategy definition, demand assessment, and portfolio management.

**ITIL4 Mapping:** The Plan activity covers: IT strategy definition, policies, objectives, demand assessment, and service delivery planning.

---

### Requirement to Deploy (R2D) → ITIL4 Design & Transition + Obtain & Build

**IT4IT:** Focuses on design, build, test, and deployment of IT solutions. Covers: solution design, build and test, release management, and deployment.

**ITIL4 Mapping:**
- *Design and Transition:* Service design, testing, and release management
- *Obtain and Build:* Procurement and construction of necessary IT infrastructure and components

---

### Request to Fulfill (R2F) → ITIL4 Deliver & Support

**IT4IT:** Focuses on fulfilling IT requests from business users in a standardised and automated way. Covers: request management, service catalogue management, and service delivery.

**ITIL4 Mapping:** The Deliver and Support activity covers: service delivery, incident management, problem management, and service desk management.

---

### Detect to Correct (D2C) → ITIL4 Improve + Engage

**IT4IT:** Focuses on detecting and resolving IT incidents and problems. Covers: event management, incident management, and problem management.

**ITIL4 Mapping:**
- *Improve:* Continuous improvement
- *Engage:* Customer engagement and service desk management

---

## Architecture Review Process

### Business Cycle and Architecture by Purpose

Architecture reviews are triggered by points in the business cycle and serve different purposes depending on their context:

| Purpose | Trigger | Architecture Focus |
|---|---|---|
| Strategic alignment | Annual strategy cycle | Enterprise Architecture, Architecture Vision |
| Programme initiation | New programme request | Segment Architecture, Architecture Roadmap |
| Project start | Project charter | Solution Architecture, Architecture Contract |
| Implementation review | Build and deploy gates | Compliance Assessment |
| Post-implementation | Project closure | Lessons learned, ABB/SBB capture |

### Architecture Review Steps (Example)
1. Receive and triage architecture change or project initiation request
2. Assess strategic fit against the current Architecture Landscape
3. Conduct stakeholder analysis and identify concerns
4. Review applicable standards and constraints (Architecture Principles, Standards Library)
5. Produce or update architecture artefacts
6. Conduct formal stakeholder review; obtain endorsement
7. Publish decision and update Architecture Repository
8. Issue Architecture Contract or Change Request as appropriate

---

## Waterfall vs Agile Risk Comparison

| Risk Dimension | Waterfall | Agile |
|---|---|---|
| **Requirements risk** | High — requirements locked early; late discovery is costly | Lower — iterative refinement catches gaps early |
| **Architecture risk** | Baseline must be thorough; no-regret decisions critical | Incremental architecture; MVA reduces risk |
| **Change risk** | High — changes late in cycle are expensive | Lower — change is expected and accommodated |
| **Delivery risk** | All-or-nothing delivery increases exposure | Incremental delivery reduces exposure |
| **Governance risk** | Governance gates are well-defined but infrequent | Governance must adapt to sprint cadence |

> Agile development is high risk **in the absence of a sufficient understanding of the baseline**.

---

## Tailoring TOGAF to the Context

TOGAF may be tailored for the project's context and delivery methodology. Key tailoring decisions:

### Selecting Deliverables and Artefacts
- Not all phases need to be executed in full for every project
- Select appropriate deliverables and artefacts to meet project and stakeholder needs
- Agile projects may combine or abbreviate ADM phases
- The Tailored Architecture Framework documents these decisions

### Cynefin Framework — Method Selection

Use the Cynefin framework to select the appropriate delivery method for each work package:

| Domain | Characteristics | Recommended Method |
|---|---|---|
| **Complex** | Cause and effect only understood in retrospect | SCRUM |
| **Complicated** | Cause and effect understood with expertise | Kanban / SCRUM |
| **Obvious** | Clear cause and effect; best practices exist | Waterfall |
| **Chaotic** | No clear cause and effect; action first | Agile (rapid response) |

### Iteration Cycles — Suggested Pattern (Target First)

A "Target First" iteration approach:
1. Develop Target Architecture (vision and goals)
2. Analyse Baseline Architecture (where we are now)
3. Perform Gap Analysis (what needs to change)
4. Define Transition Architectures (incremental steps)
5. Develop Roadmap and Migration Plan

---

## Management Framework Interactions

The Implementation and Migration Plan must confirm interactions with the organisation's management framework:

| Framework Area | Interaction |
|---|---|
| **Portfolio Management** | Work packages handed to PMO; alignment with portfolio priorities |
| **Programme Management** | WPs grouped into programmes; business value assigned |
| **Project Management** | Individual project charters created from WPs; PM methodologies (PRINCE2, PMBOK) applied |
| **Change Management** | Approach to managing organisational change; change readiness assessed in Phase F |
| **Risk Management** | Risk Treatment/Mitigation Plan integrated with enterprise risk registers |
| **Benefits Realisation** | Benefits tracked through OKRs and CSFs established in Architecture Vision |

---

## OKRs and CSFs in Architecture Projects

### Objectives and Key Results (OKRs)
Used to ensure value is delivered and alignment with standards and regulations is maintained.

- **Objective:** Clearly defined qualitative change
- **Key Result:** Specific, often quantitative performance target

*Architecture teams should set OKRs annually and assess progress quarterly.*

### Critical Success Factors (CSFs)
Define success for a project. Provide managers and implementers with a gauge for what constitutes a successful implementation.

CSFs should be established during Architecture Vision (Phase A) and monitored through Implementation Governance (Phase G).

---

*Source: TOGAF 10 Standard Knowledge Base — APM Sheet*
