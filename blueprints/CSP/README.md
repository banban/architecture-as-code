# Care Services Provider (CSP) Event-Driven Architecture (EDA)
This repository captures two complementary views of the same customer integration design:

- `event-contracts.ts`: shared canonical event and topic contracts
- `data-governance.ts`: shared ownership, sensitivity, and access policy model
- `enterprise-eda-architecture.ts`: enterprise integration view
- `application-eda-domain.ts`: front-office application/domain view

## TypeScript Validation

This folder can be validated as a lightweight TypeScript project.

Included project files:

- `package.json`: project metadata and a `typecheck` script
- `tsconfig.json`: strict TypeScript compiler settings for schema validation
- `eslint.config.mjs`: lightweight linting for unused imports and TypeScript hygiene
- `.gitignore`: ignores local dependency and build artifacts

Typical validation flow:

```powershell
npm install
npm run typecheck
npm run lint
```

This uses the TypeScript compiler as a consistency check across the architecture artifacts without generating runtime output.
ESLint adds lightweight static analysis for unused imports and TypeScript hygiene.

The goal is to keep customer and stakeholder data aligned across front office, finance/billing, and service delivery systems while remaining decoupled, scalable, and easy to extend for future solutions.

## Why Two Views

The architecture is intentionally split into two viewpoints because they answer different questions.

- Enterprise view: How do systems stay aligned across the landscape?
- Application view: How does the front-office bounded context publish and consume those shared contracts?

Together they show both strategic architecture and local implementation responsibility without tying the design to any vendor or platform.

## Core Design Principles

- Use event-driven architecture implemented through publish/subscribe on a shared customer topic.
- Avoid point-to-point integration between operational systems.
- Define clear ownership for each attribute group so consistency is governed, not assumed.
- Keep systems loosely coupled through canonical events and local projections.
- Design for eventual consistency with idempotency, replay, auditability, and reconciliation.
- Make future systems pluggable by subscribing to the same customer event contracts.
- Segregate sensitive and insensitive data so medical and high-risk PII can be handled under stronger controls.
- Encrypt data in transit and at rest, with stronger controls such as tokenization and field-level encryption for high-sensitivity domains.

## Ownership Model

| Attribute Group | Authoritative System | Typical Consumers |
| --- | --- | --- |
| Core identity | FrontOffice | FinanceBilling, ServiceDelivery |
| Relationship data | FrontOffice | FinanceBilling, ServiceDelivery |
| Contact data | FrontOffice | FinanceBilling, ServiceDelivery |
| Address data | FrontOffice | FinanceBilling, ServiceDelivery |
| Billing data | FinanceBilling | FrontOffice, ServiceDelivery |
| Service data | ServiceDelivery | FrontOffice, FinanceBilling |

## Canonical Event Catalog

All systems publish and subscribe via the shared `customer-topic`.

- `customer.created`
- `customer.updated`
- `customer.status_changed`
- `customer.billing_profile_changed`
- `customer.service_profile_changed`
- `customer.merged`

## External Partner Integration Endpoints

The same event-driven pattern can be extended to trusted external partners through controlled integration endpoints.

| Partner Type | Typical Endpoint Style | Typical Flow |
| --- | --- | --- |
| Government regulator | Subscriber or secure API | Receives compliance, status, notification, or reporting events |
| Emergency service | Bidirectional | Receives critical customer/service context and can publish incident updates |
| Volunteer organisation | Bidirectional | Receives referrals and publishes engagement or completion outcomes |
| Non-profit partner | Bidirectional | Receives approved stakeholder context and publishes case or referral outcomes |

These partner integrations should always be mediated by the integration layer rather than direct access to core operational systems.

## Data Protection And Privacy Model

The architecture separates data concerns so sensitive information is not treated the same way as routine operational data.

### Recommended Segregation

- Insensitive and routine operational data can flow through the standard canonical customer topic.
- PII should be minimized in event payloads and exposed only where there is clear business need.
- Sensitive health or medical data should be segregated into protected domains, protected topics, or secure APIs with stricter access controls.
- External partners should receive the minimum necessary data for their purpose, filtered by policy.

### Recommended Security Controls

| Concern | Recommended Approach |
| --- | --- |
| Data in transit | TLS or equivalent transport encryption for all APIs, brokers, and partner endpoints |
| Data at rest | Storage-level encryption for all operational stores, event stores, and backups |
| High-risk fields | Field-level encryption for medical data, regulatory data, and restricted financial attributes |
| Identity correlation | Tokenization or pseudonymization where full identifiers are not required downstream |
| Key management | Separate key domains for sensitive datasets and tightly controlled decrypt permissions |
| Partner integration | Policy-based filtering, contract scoping, consent checks, and full audit trail |

## C4 Level 1: Context

This view shows the business landscape and the key external relationships.

```mermaid
flowchart LR
    User["Customer / Stakeholder User"]
    REG["Government Regulator"]
    EMG["Emergency Service"]
    VOL["Volunteer Organisation"]
    NFP["Non-Profit Partner"]

    subgraph CSP["CSP Customer Data Landscape"]
        FO["Front Office Platform\n(CRM-style relationship management)"]
        FIN["Finance / Billing System"]
        SD["Service Delivery System"]
        FUT["Future Systems\n(portal, reporting, analytics, case mgmt, etc.)"]
    end

    User --> FO
    REG --> CSP
    EMG <--> CSP
    VOL <--> CSP
    NFP <--> CSP
    FUT --> CSP
```

### Context Notes

- The business problem is shared customer consistency across operational systems.
- The target state is not direct coupling between every system.
- Future systems should connect without redesigning the existing estate.
- External partners should connect through governed endpoints, not through direct system access.
- Sensitive and medical data should be shared only through protected channels and policy-controlled contracts.

## C4 Level 2: Containers

This view introduces the major runtime building blocks and the event-driven integration style.

```mermaid
flowchart LR
    subgraph Systems["Operational Systems"]
        FO["Front Office Platform"]
        FIN["Finance / Billing"]
        SD["Service Delivery"]
        FUT["Future Solution"]
    end

    subgraph Integration["Enterprise Integration Layer"]
        API["Integration APIs / Adapters"]
        TOPIC["Customer Topic, Publish/Subscribe Backbone"]
        PTOPIC["Protected Sensitive Topic / Secure Exchange"]
        GOV["Governance Controls, validation, schema, replay, audit, idempotency, reconciliation"]
        SEC["Security Controls, consent, policy filters, tokenization, encryption"]
    end

    subgraph Partners["External Partners"]
        REG["Government Regulator"]
        EMG["Emergency Service"]
        VOL["Volunteer Organisation"]
        NFP["Non-Profit Partner"]
    end

    FO --> API
    FIN --> API
    SD --> API
    FUT --> API
    REG --> API
    EMG --> API
    VOL --> API
    NFP --> API

    API --> TOPIC
    API --> PTOPIC
    TOPIC --> API
    PTOPIC --> API
    GOV --- API
    GOV --- TOPIC
    GOV --- PTOPIC
    SEC --- API
    SEC --- TOPIC
    SEC --- PTOPIC
```

### Container Notes

- Systems do not integrate directly with each other.
- The integration layer owns translation, routing, and operational controls.
- The customer topic is the shared contract boundary for decoupled change propagation.
- New systems plug in through the same integration layer and event contracts.
- External partners connect through secure partner endpoints managed by the same integration layer.
- Sensitive data can be routed to protected topics or secure APIs rather than the general customer topic.

## C4 Level 3: Components

This view separates the enterprise integration responsibilities from the front-office application responsibilities.

```mermaid
flowchart LR
    subgraph Enterprise["Enterprise Integration View"]
        OWN["Ownership Rules\nwho owns which attributes"]
        MODEL["Canonical Customer Model\nidentity, references, core profile"]
        EVENTS["Canonical Customer Events\ncreated, updated, status,\nbilling profile, service profile, merged"]
        PARTNER["Partner Endpoint Policies\nregulator, emergency, volunteer, non-profit"]
        CLASS["Data Classification Rules\npublic, internal, PII, medical, restricted"]
        ROUTES["Routing and Subscription Rules"]
        OPS["Operational Controls\nretry, dead-letter, replay,\naudit, reconciliation"]
        TOPIC["customer-topic"]
        STOPIC["protected-sensitive-topic"]
        CRYPTO["Encryption / Tokenization\ntransit, at rest, field-level"]
    end

    subgraph FrontOffice["Front-Office Application View"]
        APP["FrontOfficeCustomerService"]
        AGG["FrontOfficeCustomer Aggregate\ncore identity + relationship data"]
        REPO["Customer Repository"]
        PUB["Event Publisher"]
        BILL["Billing Projection Handler"]
        SERV["Service Projection Handler"]
        PROJ["Local Workspace View\ncustomer + billing projection + service projection"]
    end

    OWN --> MODEL
    CLASS --> MODEL
    MODEL --> EVENTS
    EVENTS --> ROUTES
    PARTNER --> ROUTES
    ROUTES --> TOPIC
    ROUTES --> STOPIC
    OPS --- TOPIC
    OPS --- STOPIC
    CRYPTO --- TOPIC
    CRYPTO --- STOPIC

    APP --> AGG
    AGG --> REPO
    APP --> PUB
    PUB --> TOPIC
    TOPIC --> BILL
    TOPIC --> SERV
    BILL --> PROJ
    SERV --> PROJ
    AGG --> PROJ
```

### Component Notes

- The enterprise view defines the shared contracts and governance policies.
- The enterprise view also defines partner endpoint controls and data-classification policy.
- The application view focuses on one bounded context: front office.
- Front office publishes only the attributes it owns.
- Front office consumes finance and service events to maintain local read projections.
- Billing and service systems remain authoritative for their own data even when that data is visible in front office.
- Sensitive medical and high-risk PII can be separated from the general customer topic and routed through protected exchange channels.
- Encryption applies in transit and at rest, with stronger options like tokenization and field-level encryption for the most sensitive fields.

## How The Two TypeScript Files Relate

### Enterprise File

`enterprise-eda-architecture.ts` defines:

- bounded contexts
- canonical customer identity and profile
- ownership rules
- shared event contracts
- pub/sub abstractions
- integration-layer governance
- external partner endpoints and access policies
- data classification and protection policy
- future-system extensibility

### Shared Contracts File

`event-contracts.ts` defines:

- canonical event names
- customer event envelopes and payloads
- shared customer identity and profile structures
- neutral topic, publisher, and subscriber abstractions

### Shared Governance File

`data-governance.ts` defines:

- attribute ownership rules
- data sensitivity classifications
- encryption and segregation policy
- external partner access policy

### Application File

`application-eda-domain.ts` defines:

- the front-office-owned customer aggregate
- front-office commands and service ports
- local projections for billing and service state
- event handlers that consume peer events
- an in-memory event router for local reasoning and testing

## Recommended Presentation Narrative

For an architecture walkthrough, present it in this order:

1. Start with the context problem: multiple operational systems must stay aligned on customer data.
2. Explain the container pattern: a shared publish/subscribe customer topic removes point-to-point coupling.
3. Explain the component responsibilities: enterprise governance defines the contract, while each application owns only its bounded context.
4. Explain privacy and security: sensitive health and PII data are segregated, policy-filtered, and encrypted in transit and at rest.
5. Finish with extensibility: future systems and external partners plug in through governed endpoints rather than changing existing integrations.

## Summary

This design gives CSP:

- decoupled integration across front office, finance, and service delivery
- clear accountability for customer data ownership
- support for eventual consistency at enterprise scale
- controlled onboarding of regulators, emergency services, volunteers, and non-profit partners
- stronger privacy posture through sensitive-data segregation and policy-based sharing
- encryption strategy for data in transit and at rest
- a stable pattern for onboarding future systems with minimal rework
