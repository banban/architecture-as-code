import { describe, expect, it } from 'vitest';
import {
  BoundedContext,
  CUSTOMER_TOPIC_NAME,
  canonicalCustomerEventTypes,
  type BillingProfileChanged,
  type ContactMethod,
  type CustomerCreated,
  type CustomerEvent,
  type CustomerIdentity,
  type CustomerLifecycleStatus,
  type CustomerMerged,
  type CustomerProfile,
  type CustomerStatusChanged,
  type CustomerUpdated,
  type ExternalReference,
  type PostalAddress,
  type Publisher,
  type ServiceProfileChanged,
  type Subscriber,
  type Subscription,
  type Topic
} from '../src/event-contracts.ts';

describe('Event Contracts', () => {
  describe('Constants', () => {
    it('should have correct customer topic name', () => {
      expect(CUSTOMER_TOPIC_NAME).toBe('customer-topic');
    });

    it('should have all canonical customer event types', () => {
      expect(canonicalCustomerEventTypes).toEqual([
        'customer.created',
        'customer.updated',
        'customer.status_changed',
        'customer.billing_profile_changed',
        'customer.service_profile_changed',
        'customer.merged',
      ]);
      expect(canonicalCustomerEventTypes).toHaveLength(6);
    });
  });

  describe('BoundedContext enum', () => {
    it('should have all bounded contexts', () => {
      expect(BoundedContext.FrontOffice).toBe('FrontOffice');
      expect(BoundedContext.FinanceBilling).toBe('FinanceBilling');
      expect(BoundedContext.ServiceDelivery).toBe('ServiceDelivery');
      expect(BoundedContext.FutureSolution).toBe('FutureSolution');
    });
  });

  describe('Type validation', () => {
    it('should create valid CustomerIdentity', () => {
      const identity: CustomerIdentity = {
        customerId: 'test-customer-id',
        externalReferences: [
          {
            system: BoundedContext.FrontOffice,
            localId: 'FO-123',
            referenceType: 'Customer',
          },
        ],
      };
      expect(identity.customerId).toBe('test-customer-id');
      expect(identity.externalReferences).toHaveLength(1);
    });

    it('should create valid ContactMethod', () => {
      const contact: ContactMethod = {
        type: 'Email',
        value: 'test@example.com',
        preferred: true,
      };
      expect(contact.type).toBe('Email');
      expect(contact.value).toBe('test@example.com');
      expect(contact.preferred).toBe(true);
    });

    it('should create valid PostalAddress', () => {
      const address: PostalAddress = {
        purpose: 'Primary',
        line1: '123 Main St',
        city: 'Test City',
        state: 'Test State',
        postcode: '12345',
        countryCode: 'US',
      };
      expect(address.purpose).toBe('Primary');
      expect(address.line1).toBe('123 Main St');
      expect(address.countryCode).toBe('US');
    });

    it('should create valid CustomerProfile', () => {
      const profile: CustomerProfile = {
        identity: {
          customerId: 'test-customer-id',
          externalReferences: [],
        },
        personOrOrganisation: 'Person',
        displayName: 'Test Customer',
        status: 'Active',
        contacts: [
          {
            type: 'Email',
            value: 'test@example.com',
          },
        ],
        addresses: [
          {
            purpose: 'Primary',
            line1: '123 Main St',
            countryCode: 'US',
          },
        ],
        segmentation: {
          segment: 'Premium',
          stakeholderType: 'Individual',
        },
        billingProfile: {
          billingAccountId: 'BILL-123',
          billingStatus: 'Active',
          paymentTerms: 'Net 30',
        },
        serviceProfile: {
          serviceAccountId: 'SVC-123',
          serviceStatus: 'Active',
          serviceLocations: ['NYC', 'LA'],
        },
        metadata: {
          source: 'CRM',
          lastSync: '2023-01-01',
        },
      };
      expect(profile.personOrOrganisation).toBe('Person');
      expect(profile.status).toBe('Active');
      expect(profile.contacts).toHaveLength(1);
      expect(profile.addresses).toHaveLength(1);
    });
  });

  describe('Event types', () => {
    const baseEvent = {
      eventId: 'test-event-id',
      aggregateType: 'Customer' as const,
      aggregateId: 'test-customer-id',
      occurredAt: '2023-01-01T00:00:00Z',
      publishedBy: BoundedContext.FrontOffice,
      schemaVersion: 1,
      correlationId: 'test-correlation-id',
      causationId: 'test-causation-id',
    };

    it('should create valid CustomerCreated event', () => {
      const event: CustomerCreated = {
        ...baseEvent,
        eventType: 'customer.created',
        payload: {
          customer: {
            identity: {
              customerId: 'test-customer-id',
              externalReferences: [],
            },
            personOrOrganisation: 'Person',
            displayName: 'Test Customer',
            status: 'Active',
            contacts: [],
            addresses: [],
          },
        },
      };
      expect(event.eventType).toBe('customer.created');
      expect(event.payload.customer.displayName).toBe('Test Customer');
    });

    it('should create valid CustomerUpdated event', () => {
      const event: CustomerUpdated = {
        ...baseEvent,
        eventType: 'customer.updated',
        payload: {
          customerId: 'test-customer-id',
          changedAttributes: ['displayName'],
          customer: {
            displayName: 'Updated Name',
          },
        },
      };
      expect(event.eventType).toBe('customer.updated');
      expect(event.payload.changedAttributes).toEqual(['displayName']);
    });

    it('should create valid CustomerStatusChanged event', () => {
      const event: CustomerStatusChanged = {
        ...baseEvent,
        eventType: 'customer.status_changed',
        payload: {
          customerId: 'test-customer-id',
          previousStatus: 'Active',
          newStatus: 'Suspended',
          reason: 'Payment overdue',
        },
      };
      expect(event.eventType).toBe('customer.status_changed');
      expect(event.payload.previousStatus).toBe('Active');
      expect(event.payload.newStatus).toBe('Suspended');
    });

    it('should create valid BillingProfileChanged event', () => {
      const event: BillingProfileChanged = {
        ...baseEvent,
        eventType: 'customer.billing_profile_changed',
        payload: {
          customerId: 'test-customer-id',
          billingProfile: {
            billingAccountId: 'BILL-123',
            billingStatus: 'Active',
          },
        },
      };
      expect(event.eventType).toBe('customer.billing_profile_changed');
      expect(event.payload.billingProfile.billingStatus).toBe('Active');
    });

    it('should create valid ServiceProfileChanged event', () => {
      const event: ServiceProfileChanged = {
        ...baseEvent,
        eventType: 'customer.service_profile_changed',
        payload: {
          customerId: 'test-customer-id',
          serviceProfile: {
            serviceAccountId: 'SVC-123',
            serviceStatus: 'Active',
          },
        },
      };
      expect(event.eventType).toBe('customer.service_profile_changed');
      expect(event.payload.serviceProfile.serviceStatus).toBe('Active');
    });

    it('should create valid CustomerMerged event', () => {
      const event: CustomerMerged = {
        ...baseEvent,
        eventType: 'customer.merged',
        payload: {
          survivingCustomerId: 'surviving-id',
          retiredCustomerId: 'retired-id',
        },
      };
      expect(event.eventType).toBe('customer.merged');
      expect(event.payload.survivingCustomerId).toBe('surviving-id');
      expect(event.payload.retiredCustomerId).toBe('retired-id');
    });

    it('should validate CustomerEvent union type', () => {
      const events: CustomerEvent[] = [
        {
          ...baseEvent,
          eventType: 'customer.created',
          payload: {
            customer: {
              identity: { customerId: 'id1', externalReferences: [] },
              personOrOrganisation: 'Person',
              displayName: 'Customer 1',
              status: 'Active',
              contacts: [],
              addresses: [],
            },
          },
        } as CustomerCreated,
        {
          ...baseEvent,
          eventType: 'customer.updated',
          payload: {
            customerId: 'id2',
            changedAttributes: ['status'],
            customer: { status: 'Suspended' },
          },
        } as CustomerUpdated,
      ];

      expect(events).toHaveLength(2);
      expect(events[0]).toBeDefined();
      expect(events[1]).toBeDefined();
      expect(events[0]!.eventType).toBe('customer.created');
      expect(events[1]!.eventType).toBe('customer.updated');
    });
  });

  describe('Messaging interfaces', () => {
    it('should create valid Topic', () => {
      const topic: Topic<CustomerEvent> = {
        name: 'customer-topic',
        description: 'Customer domain events',
        publishes: {} as CustomerEvent, // Type assertion for testing
      };
      expect(topic.name).toBe('customer-topic');
      expect(topic.description).toBe('Customer domain events');
    });

    it('should create valid Subscription', () => {
      const subscription: Subscription<CustomerEvent> = {
        topicName: 'customer-topic',
        eventTypes: ['customer.created', 'customer.updated'],
        filter: (event) => event.eventType === 'customer.created',
        deliveryExpectation: 'AtLeastOnce',
      };
      expect(subscription.topicName).toBe('customer-topic');
      expect(subscription.eventTypes).toHaveLength(2);
      expect(subscription.deliveryExpectation).toBe('AtLeastOnce');
    });

    it('should create valid Publisher', () => {
      const publisher: Publisher<CustomerEvent> = {
        boundedContext: BoundedContext.FrontOffice,
        canPublish: (event) => event.publishedBy === BoundedContext.FrontOffice,
      };
      expect(publisher.boundedContext).toBe(BoundedContext.FrontOffice);
      expect(publisher.canPublish).toBeInstanceOf(Function);
    });

    it('should create valid Subscriber', () => {
      const subscriber: Subscriber<CustomerEvent> = {
        boundedContext: BoundedContext.FinanceBilling,
        subscriptions: [
          {
            topicName: 'customer-topic',
            eventTypes: ['customer.created'],
            deliveryExpectation: 'AtLeastOnce',
          },
        ],
      };
      expect(subscriber.boundedContext).toBe(BoundedContext.FinanceBilling);
      expect(subscriber.subscriptions).toHaveLength(1);
    });
  });

  describe('Type constraints', () => {
    it('should enforce CustomerLifecycleStatus values', () => {
      const validStatuses: CustomerLifecycleStatus[] = ['Prospect', 'Active', 'Suspended', 'Closed'];
      validStatuses.forEach(status => {
        expect(['Prospect', 'Active', 'Suspended', 'Closed']).toContain(status);
      });
    });

    it('should enforce ContactMethod types', () => {
      const validTypes: ContactMethod['type'][] = ['Email', 'Phone', 'Mobile'];
      validTypes.forEach(type => {
        expect(['Email', 'Phone', 'Mobile']).toContain(type);
      });
    });

    it('should enforce PostalAddress purposes', () => {
      const validPurposes: PostalAddress['purpose'][] = ['Primary', 'Billing', 'Service'];
      validPurposes.forEach(purpose => {
        expect(['Primary', 'Billing', 'Service']).toContain(purpose);
      });
    });

    it('should enforce ExternalReference types', () => {
      const validTypes: ExternalReference['referenceType'][] = ['Customer', 'Account', 'BillingAccount', 'ServiceAccount'];
      validTypes.forEach(type => {
        expect(['Customer', 'Account', 'BillingAccount', 'ServiceAccount']).toContain(type);
      });
    });
  });
});