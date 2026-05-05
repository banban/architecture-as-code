TOGAF^®^ Template -- Architecture Definition\
\
Version 2.0\
\
July 2024

Project XXXX

Client YYYY

Note: This document provides a generic template. It may require
tailoring to suit a specific client and project situation.

Document Version History

  --------------------------------------------------------------------------------------
  **Version   **Version   **Revised   **Description**                **Filename**
  Number**    Date**      By**                                       
  ----------- ----------- ----------- ------------------------------ -------------------
                                                                     

                                                                     
  --------------------------------------------------------------------------------------

# Contents {#contents .Frontmatter-Heading}

[1. Purpose of this Document
[5](#purpose-of-this-document)](#purpose-of-this-document)

[1.1 Output and Input [5](#output-and-input)](#output-and-input)

[2. Architecture Definition
[6](#architecture-definition)](#architecture-definition)

[2.1 Scope [6](#scope)](#scope)

[2.2 Goals, Objectives, and Constraints
[6](#goals-objectives-and-constraints)](#goals-objectives-and-constraints)

[2.2.1 Goals [6](#goals)](#goals)

[2.2.2 Objectives [6](#objectives)](#objectives)

[2.2.3 Constraints [6](#constraints)](#constraints)

[2.3 Architecture Principles
[6](#architecture-principles)](#architecture-principles)

[2.4 Baseline Architecture
[6](#baseline-architecture)](#baseline-architecture)

[2.5 Architecture Models (For Each State to be Modeled)
[6](#architecture-models-for-each-state-to-be-modeled)](#architecture-models-for-each-state-to-be-modeled)

[2.5.1 Business Architecture Models
[7](#business-architecture-models)](#business-architecture-models)

[2.5.2 Data Architecture Models
[7](#data-architecture-models)](#data-architecture-models)

[2.5.3 Application Architecture Models
[7](#application-architecture-models)](#application-architecture-models)

[2.5.4 Technology Architecture Models
[7](#technology-architecture-models)](#technology-architecture-models)

[3. Rationale and Justification for Architectural Approach
[8](#rationale-and-justification-for-architectural-approach)](#rationale-and-justification-for-architectural-approach)

[3.1 Rationale [8](#rationale)](#rationale)

[3.2 Approach [8](#approach)](#approach)

[4. Mapping to Architecture Repository
[9](#mapping-to-architecture-repository)](#mapping-to-architecture-repository)

[4.1 Mapping to Architecture Landscape
[9](#mapping-to-architecture-landscape)](#mapping-to-architecture-landscape)

[4.2 Mapping to Reference Models
[9](#mapping-to-reference-models)](#mapping-to-reference-models)

[4.3 Mapping to Standards
[9](#mapping-to-standards)](#mapping-to-standards)

[4.4 Re-Use Assessment [9](#re-use-assessment)](#re-use-assessment)

[5. Gap Analysis [10](#gap-analysis)](#gap-analysis)

[6. Resolve Impact Across the Architecture Landscape
[11](#resolve-impact-across-the-architecture-landscape)](#resolve-impact-across-the-architecture-landscape)

[6.1 Impact on Pre-Existing Architectures
[11](#impact-on-pre-existing-architectures)](#impact-on-pre-existing-architectures)

[6.2 Recent Changes Impacting the Business Architecture
[11](#recent-changes-impacting-the-business-architecture)](#recent-changes-impacting-the-business-architecture)

[6.3 Opportunities [11](#opportunities)](#opportunities)

[6.4 Impact on Other Projects
[11](#impact-on-other-projects)](#impact-on-other-projects)

[7. Transition Architecture
[12](#transition-architecture)](#transition-architecture)

[7.1 Definition of Transition States
[12](#definition-of-transition-states)](#definition-of-transition-states)

[7.2 Business Architecture for Each Transition State
[12](#business-architecture-for-each-transition-state)](#business-architecture-for-each-transition-state)

[7.3 Data Architecture for Each Transition State
[12](#data-architecture-for-each-transition-state)](#data-architecture-for-each-transition-state)

[7.4 Application Architecture for Each Transition State
[12](#application-architecture-for-each-transition-state)](#application-architecture-for-each-transition-state)

[7.5 Technology Architecture for Each Transition State
[12](#technology-architecture-for-each-transition-state)](#technology-architecture-for-each-transition-state)

Tracking Information

+-------------+--------------------------------------------------------------+
| **Project   | Project XXXX                                                 |
| Name**      |                                                              |
+=============+====================+====================+====================+
| **Prepared  |                    | **Document Version |                    |
| By**        |                    | No.**              |                    |
+-------------+--------------------+--------------------+--------------------+
| **Title**   | Architecture       | **Document Version |                    |
|             | Definition         | Date**             |                    |
+-------------+--------------------+--------------------+--------------------+
| **Reviewed  |                    | **Review Date**    |                    |
| By**        |                    |                    |                    |
+-------------+--------------------+--------------------+--------------------+

Distribution List

  ------------------------------------------------------------------------
  **From**                     **Date**     **Phone/Email**
  ---------------------------- ------------ ------------------------------
                                            

                                            
  ------------------------------------------------------------------------

  --------------------------------------------------------------------------
  **To**                **Action\***   **Due Date** **Phone/Email**
  --------------------- -------------- ------------ ------------------------
                                                    

                                                    

                                                    

                                                    
  --------------------------------------------------------------------------

\* Action Types: Approve, Review, Inform, File, Action Required, Attend
Meeting, Other (please specify)

# Purpose of this Document

The Architecture Definition Document is the deliverable container for
the core architectural artifacts created during a project and for
important related information. The Architecture Definition Document
spans all architecture domains (Business, Data, Application, and
Technology) and also examines all relevant states of the architecture
(Baseline, Transition, and Target).

A Transition Architecture shows the enterprise at an architecturally
significant state between the Baseline and Target Architectures.
Transition Architectures are used to describe transitional Target
Architectures necessary for effective realization of the Target
Architecture.

The Architecture Definition Document is a companion to the Architecture
Requirements Specification, with a complementary objective:

- The Architecture Definition Document provides a qualitative view of
  the solution and aims to communicate the intent of the architects

- The Architecture Requirements Specification provides a quantitative
  view of the solution, stating measurable criteria that must be met
  during the implementation of the architecture

## Output and Input

The TOGAF^®^ Content Framework (see [4. Architecture
Deliverables](https://pubs.opengroup.org/togaf-standard/architecture-content/chap04.html))
identifies deliverables that are produced as outputs from executing the
Architecture Development Method (ADM) cycle and potentially consumed as
inputs at other points in the ADM.

This deliverable is produced, updated, and consumed by the ADM Phases:

  ------------------------------------------------------------------------
  **Deliverable**        **Output from...**       **Input to...**
  ---------------------- ------------------------ ------------------------
  Architecture           A, B, C, D, E, F         B, C, D, E, F, G, H
  Definition                                      

  ------------------------------------------------------------------------

# Architecture Definition

## Scope

The scope of organizations impacted. The scope is first set on the
Architecture Definition draft in Phase A and may evolve depending during
the next phases and iterations.

## Goals, Objectives, and Constraints

### Goals

### Objectives

### Constraints

## Architecture Principles

[Principles](https://pubs.opengroup.org/togaf-standard/architecture-content/chap04.html#tag_04_02_04)
are general rules and guidelines, intended to be enduring and seldom
amended, that inform and support the way in which an organization sets
about fulfilling its mission.

May reference the Architecture Principles documentation.

  ------------------ -------------------------------------------------------
  **Name**           **\<Name of Principle\>**

  **Statement**      

  **Rationale**      

  **Implications**   
  ------------------ -------------------------------------------------------

## Baseline Architecture

Develop a Baseline Description of the existing Business Architecture, to
the extent necessary to support the Target Business Architecture. The
scope and level of detail to be defined will depend on the extent to
which existing business elements are likely to be carried over into the
Target Business Architecture, and on whether Architecture Descriptions
exist, as described
in [Approach](https://pubs.opengroup.org/togaf-standard/adm/chap04.html#tag_04_05).
To the extent possible, identify the relevant Business Architecture
building blocks, drawing on the Architecture Repository (see the [TOGAF
Standard -- Architecture
Content](https://pubs.opengroup.org/togaf-standard/architecture-content/index.html)).

## Architecture Models (For Each State to be Modeled)

An "Architecture Model" is a representation of a subject of interest. A
model provides a smaller scale, simplified, and/or abstract
representation of the subject matter.

### Business Architecture Models

### Data Architecture Models

### Application Architecture Models

### Technology Architecture Models

# Rationale and Justification for Architectural Approach

## Rationale

## Approach

# Mapping to Architecture Repository

## Mapping to Architecture Landscape

## Mapping to Reference Models

## Mapping to Standards

## Re-Use Assessment

# Gap Analysis

A key step in validating an architecture is to consider what may have
been forgotten. The architecture must support all of the essential
information processing needs of the organization. The most critical
source of gaps that should be considered is stakeholder concerns that
have not been addressed in prior architectural work; see [Gap
Analysis](https://pubs.opengroup.org/togaf-standard/adm-techniques/chap05.html).

Potential sources of gaps include:

- Business domain gaps:

  1.  People gaps (e.g., cross-training requirements)

  2.  Process gaps (process inefficiencies)

  3.  Tools gaps (e.g., duplicate or missing tool functionality)

  4.  Information gaps

  5.  Measurement gaps

  6.  Financial gaps

  7.  Facilities gaps (buildings, office space, etc.)

- Data domain gaps:

  1.  Data not of sufficient currency

  2.  Data not located where it is needed

  3.  Not the data that is needed

  4.  Data not available when needed

  5.  Data not created

  6.  Data not consumed

  7.  Data relationship gaps

- Applications impacted, eliminated, or created

- Technologies impacted, eliminated, or created

# Resolve Impact Across the Architecture Landscape

Once the Business Architecture is finalized, it is necessary to
understand any wider
[impacts](https://pubs.opengroup.org/togaf-standard/adm/chap04.html#tag_04_03_06)
or implications.

## Impact on Pre-Existing Architectures

Does this Business Architecture create an impact on any pre-existing
architectures?

## Recent Changes Impacting the Business Architecture

Have recent changes been made that impact on the Business Architecture?

## Opportunities 

Are there any opportunities to leverage work from this Business
Architecture in other areas of the organization?

## Impact on Other Projects

Will this Business Architecture be impacted by other projects (including
those planned as well as those currently in progress)?

# Transition Architecture

## Definition of Transition States

## Business Architecture for Each Transition State

## Data Architecture for Each Transition State

## Application Architecture for Each Transition State

## Technology Architecture for Each Transition State
