# TOGAF 10 — Content Framework & Architecture Artefacts

> **Purpose:** Reference for the TOGAF Content Framework — what architecture artefacts exist, what they contain, and when they are produced. Use this file to ensure architecture projects produce the correct deliverables and artefacts at each ADM phase, and to understand how artefacts relate to the Enterprise Metamodel.

---

## Overview

The TOGAF Content Framework describes the types of work products consumed and produced by an EA Capability. It is the companion to the ADM:

- **ADM** describes *what needs to be done*
- **Content Framework** describes *what the architecture should look like once it is done*

The Content Framework is structured around three levels of work product:

| Level | Definition | Example |
|---|---|---|
| **Deliverable** | Contractually specified, formally reviewed, agreed, and signed off by stakeholders | Architecture Definition Document |
| **Artefact** | An architectural work product describing an aspect of the architecture; consumed or produced by each phase | Stakeholder Map, Gap Analysis |
| **Building Block** | A (potentially re-usable) component of enterprise capability | Architecture Building Block (ABB), Solution Building Block (SBB) |

---

## Architecture Repository Structure

The Architecture Repository is the knowledgebase for all architecture-related projects and contains six components:

| Component | Description |
|---|---|
| **Architecture Metamodel** | Describes the formal description language and model for the architecture |
| **Architecture Landscape** | Snapshots of the architectural state at strategic, segment, and solution levels |
| **Standards Library** | Reference standards that new architectures must comply with |
| **Reference Library** | Reference materials (guidelines, templates, patterns) |
| **Governance Log** | Records of governance activity, decisions, and dispensations |
| **Viewpoint Library** | Collection of viewpoint specifications used to construct architecture views |

---

## Enterprise Continuum

The Enterprise Continuum is a categorisation mechanism for architecture and solution artefacts, ranging from generic to organisation-specific:

```
← Generic ─────────────────────────────── Organisation-Specific →

Architecture Continuum:
Foundation Architecture → Common Systems Architecture → Industry Architecture → Organisation-Specific Architecture

Solutions Continuum:
Foundation Solutions → Common Systems Solutions → Industry Solutions → Organisation-Specific Solutions
```

- **Architecture Continuum:** Repository of architectural elements with increasing detail and specialisation
- **Solutions Continuum:** Repository of re-usable solutions corresponding to Architecture Continuum entries
- **Capability Continuum:** Traces capability development from generic to organisation-specific

Each Architecture Project creates, refines, and potentially changes components in the EA Landscape.

---

## Architecture Landscape Characteristics

| Dimension | Description |
|---|---|
| **Breadth** | Scope of the enterprise covered |
| **Level of Detail** | Strategic → Segment → Solution |
| **Time** | Baseline (current) → Transition → Target |
| **Recency** | How up-to-date the landscape description is |

### Strategic Architecture
Executive-level, long-term view. Provides the organising framework for all operational and change activity.

### Segment Architecture
Detailed, formal description of areas within the enterprise. Used at programme or portfolio level to organise and align change activity.

### Solution Architecture
Discrete and focused description of a specific business operation or activity and how IS/IT supports it.

---

## Key Artefacts by ADM Phase

### Preliminary Phase
| Artefact | Type | Description |
|---|---|---|
| Architecture Principles Catalog (APC) | Deliverable | Rules and guidelines governing architecture work |
| Request for Architecture Work (RAW) | Deliverable | Trigger for beginning an ADM cycle |
| Organisational Model for EA | Artefact | Roles, responsibilities, and governance boundaries |
| Tailored Architecture Framework | Deliverable | Customised TOGAF for the organisation |

### Phase A — Architecture Vision
| Artefact | Type | Description |
|---|---|---|
| Statement of Architecture Work (SAW) | Deliverable | Scope and approach for the ADM cycle |
| Architecture Vision | Deliverable | High-level summary of the Target Architecture |
| Architecture Requirements Specification (ARS) | Deliverable | Quantitative statements of architecture requirements |
| Communications Plan | Deliverable | Stakeholder communication strategy |
| Risk Catalog | Artefact | Identified risks and key risk areas |
| Stakeholder Catalog | Artefact | All stakeholders with roles and interests |
| Business Scenario | Artefact | Business problem and desired outcomes |

### Phase B — Business Architecture
| Artefact | Type | Description |
|---|---|---|
| Business Capabilities Catalog | Deliverable | All business capabilities with definitions |
| Business Model Canvas (current and future) | Artefact | Visual representation of the business model |
| Business Footprint Diagram | Artefact | Organisational roles, goals, and functions |
| Business Risk Model | Artefact | Risks associated with the business architecture |
| Value Stream / Capability Matrix | Artefact | Maps value streams to business capabilities |
| Organisation Map | Artefact | Organisational structure and relationships |
| Business Process Models | Artefact | Descriptions of key business processes |

### Phase C — Information Systems Architecture
| Artefact | Type | Description |
|---|---|---|
| Data Entity / Data Component Catalog | Artefact | All data entities and their attributes |
| Application Portfolio Catalog | Artefact | All applications with status and alignment |
| Interface Catalog | Artefact | All system interfaces and integration points |
| Security Services Catalog | Artefact | Security services mapped as ABBs |
| Application Interaction Matrix | Artefact | Application-to-application dependencies |
| Data Lifecycle Diagram | Artefact | Data creation through archival/disposal |
| Data Security Diagram | Artefact | Data classification and security controls |
| ABF to Microservices Mapping | Artefact | Atomic Business Functions mapped to services |
| API to Consumer Mapping | Artefact | API exposure and consumption relationships |

### Phase D — Technology Architecture
| Artefact | Type | Description |
|---|---|---|
| Technology Portfolio Catalog | Deliverable | All technology components in use or planned |
| Technology Standards Catalog | Artefact | Approved technology standards |
| Platform Processing Diagram | Artefact | Logical processing and platform topology |
| Network and Communications Diagram | Artefact | Network infrastructure and communication links |
| Environments and Locations Diagram | Artefact | Physical and logical deployment environments |
| Decomposition Diagram | Artefact | Technology component breakdown |

### Phase E — Opportunities and Solutions
| Artefact | Type | Description |
|---|---|---|
| Architecture Roadmap | Deliverable | Sequenced set of work packages with timeline |
| Solution Building Blocks (SBBs) | Deliverable | Candidate solutions conforming to ABBs |
| Transition Architecture | Deliverable | Intermediate states between baseline and target |
| Implementation Factor Assessment Matrix | Artefact | Factors and deductions affecting implementation |
| Benefits Diagram | Artefact | Visualisation of expected benefits |
| Project Context Diagram | Artefact | Project scope and dependencies |
| Consolidated Gaps | Artefact | All gaps from domain architectures combined |

### Phase F — Migration Planning
| Artefact | Type | Description |
|---|---|---|
| Implementation and Migration Plan (I&MP) | Deliverable | Full schedule of projects and programmes |
| Architecture Contract | Deliverable | Joint agreement on deliverables and quality |
| Project Charters | Deliverable | Initiation documents for each work package |
| Migration Roadmap | Artefact | Sequenced view of migration activities |
| Architecture Alternatives and Trade-Offs | Artefact | Analysis of implementation options |

### Phase G — Implementation Governance
| Artefact | Type | Description |
|---|---|---|
| Architecture Compliance Reviews | Deliverable | Results of compliance assessments |
| Governance and Approval Plan | Deliverable | Governance process for implementation |
| Opportunities Catalog | Artefact | Reusable patterns and capabilities discovered |
| Implementation Governance Model | Artefact | RACI and governance structure for implementation |

### Phase H — Architecture Change Management
| Artefact | Type | Description |
|---|---|---|
| Architecture Change Request | Deliverable | Formal request to modify the architecture |
| Updated Architecture Requirements | Deliverable | Revised requirements reflecting changes |
| Change & Rollback Plan | Artefact | How changes will be made and reversed if needed |

---

## Building Blocks

### Architecture Building Block (ABB)
- Defines the **what** (requirements)
- Describes a single aspect of the architecture model
- Implementation-independent
- Used in Phases B, C, D to describe capabilities and requirements

### Solution Building Block (SBB)
- Defines the **how** (implementation)
- A candidate solution conforming to an ABB
- Real products that can be procured or developed
- Created in Phase E (Opportunities and Solutions)

### Relationship
```
ABB (what is needed) → SBB (how it will be provided)
```

---

## Architecture Views and Viewpoints

### View
A representation of the EA Landscape that addresses a set of stakeholder concerns. Either:
- Describes how the architecture addresses those concerns, or
- Demonstrates how associated requirements are met

### Viewpoint
A specification of the conventions for constructing a view. Based on ISO 42010 — a form of abstraction using selected architectural constructs as structuring rules to focus on particular concerns.

### Viewpoint Library
Contains all viewpoint specifications in the Reference Library section of the Architecture Repository.

### Completeness and Integrity Test
A valid architecture view must answer:
- Does it address **all** the concerns of its stakeholders?
- Can the architecture views be **connected** to each other?
- Can conflicting concerns be **reconciled**?
- What **trade-offs** have been made (e.g., security vs. performance)?

---

## Artefact Integration

Architecture artefacts are integrated through the Enterprise Metamodel:

- **Catalogs** → lists of architectural elements (building blocks, principles, standards)
- **Matrices** → relationships between elements (Application/Data, Role/Application)
- **Diagrams** → visual representations of elements and relationships

The Content Framework ensures that artefacts produced in each phase:
1. Are consistent with artefacts from other phases
2. Can be traced back to stakeholder concerns and requirements
3. Feed forward into subsequent phases
4. Are reusable as architectural building blocks

---

## Levels of Architecture Conformance

| Level | Implementation Coverage |
|---|---|
| **Irrelevant** | No features in common with specification |
| **Consistent** | Some features in common, correctly implemented; others missing or extra |
| **Compliant** | All implemented features per specification; some specified features absent |
| **Conformant** | All specified features implemented correctly; additional non-specified features present |
| **Fully Conformant** | Complete correspondence; all specified features, nothing extra |
| **Non-conformant** | Any case where specified features are implemented contrary to the specification |

---

## Integration with Other Frameworks

The TOGAF Content Framework can be mapped to and integrated with:

| Framework | Area of Integration |
|---|---|
| **ArchiMate** | Enterprise architecture modelling language; used for Business Capability Catalog, Value Stream mapping, Information Maps |
| **SABSA** | Security architecture; Business Attribute Profile, security services as ABBs |
| **ITIL / IT4IT** | Service management; maps IT4IT value streams to ITIL4 value chain activities |
| **Azure Well-Architected Framework** | Cloud workload quality (Reliability, Security, Cost Optimisation, Operational Excellence, Performance) |
| **Cloud Adoption Framework** | Cloud strategy, migration, governance, and management |
| **ISO 42010** | Architecture description standard; views, viewpoints, concerns |

---

*Source: TOGAF 10 Standard Knowledge Base — Content Framework Sheet*
