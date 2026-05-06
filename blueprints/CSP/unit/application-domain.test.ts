import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  type CustomerEvent,
} from '../event-contracts.ts';

import {
  CustomerEventRouter,
  FrontOfficeRules,
  type CustomerEventSubscriber,
} from '../application-domain.ts';

// Mock event types for testing
const mockCustomerCreatedEvent: CustomerEvent = {
  eventId: 'test-event-id',
  eventType: 'customer.created',
  aggregateType: 'Customer',
  aggregateId: 'test-customer-id',
  occurredAt: '2023-01-01T00:00:00Z',
  publishedBy: 'FrontOffice',
  schemaVersion: 1,
  payload: {
    customer: {
      identity: { customerId: 'test-customer-id', externalReferences: [] },
      personOrOrganisation: 'Person',
      displayName: 'Test Customer',
      status: 'Active',
      contacts: [],
      addresses: [],
    },
  },
};

const mockCustomerUpdatedEvent: CustomerEvent = {
  eventId: 'test-event-id-2',
  eventType: 'customer.updated',
  aggregateType: 'Customer',
  aggregateId: 'test-customer-id',
  occurredAt: '2023-01-01T00:00:00Z',
  publishedBy: 'FrontOffice',
  schemaVersion: 1,
  payload: {
    customerId: 'test-customer-id',
    changedAttributes: ['displayName'],
    customer: {
      displayName: 'Updated Customer',
    },
  },
};

describe('FrontOfficeRules', () => {
  describe('canTransitionStatus', () => {
    it('should allow valid transitions', () => {
      expect(FrontOfficeRules.canTransitionStatus('Active', 'Suspended')).toBe(true);
      expect(FrontOfficeRules.canTransitionStatus('Suspended', 'Closed')).toBe(true);
      expect(FrontOfficeRules.canTransitionStatus('Active', 'Closed')).toBe(true);
    });

    it('should deny invalid transitions', () => {
      expect(FrontOfficeRules.canTransitionStatus('Closed', 'Active')).toBe(false);
      expect(FrontOfficeRules.canTransitionStatus('Closed', 'Suspended')).toBe(false);
      expect(FrontOfficeRules.canTransitionStatus('Suspended', 'Active')).toBe(false);
    });
  });
});

describe('CustomerEventRouter', () => {
  let router: CustomerEventRouter;

  beforeEach(() => {
    router = new CustomerEventRouter();
  });

  it('should register subscribers', () => {
    const mockSubscriber: CustomerEventSubscriber = {
      subscribedTo: ['customer.created'],
      onEvent: vi.fn(),
    };

    router.register(mockSubscriber);

    // Verify subscriber is registered (internal state check via publish)
    const subscribers = (router as unknown as { subscribers: Map<string, CustomerEventSubscriber[]> }).subscribers.get('customer.created');
    expect(subscribers).toBeDefined();
    expect(subscribers).toHaveLength(1);
    expect(subscribers?.[0]).toBe(mockSubscriber);
  });

  it('should publish events to subscribers', async () => {
    const mockSubscriber1: CustomerEventSubscriber = {
      subscribedTo: ['customer.created'],
      onEvent: vi.fn(),
    };

    const mockSubscriber2: CustomerEventSubscriber = {
      subscribedTo: ['customer.updated'],
      onEvent: vi.fn(),
    };

    router.register(mockSubscriber1);
    router.register(mockSubscriber2);

    await router.publish(mockCustomerCreatedEvent);

    expect(mockSubscriber1.onEvent).toHaveBeenCalledWith(mockCustomerCreatedEvent);
    expect(mockSubscriber1.onEvent).toHaveBeenCalledTimes(1);
    expect(mockSubscriber2.onEvent).not.toHaveBeenCalled();

    await router.publish(mockCustomerUpdatedEvent);

    expect(mockSubscriber2.onEvent).toHaveBeenCalledWith(mockCustomerUpdatedEvent);
    expect(mockSubscriber2.onEvent).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple subscribers for the same event', async () => {
    const mockSubscriber1: CustomerEventSubscriber = {
      subscribedTo: ['customer.created'],
      onEvent: vi.fn(),
    };

    const mockSubscriber2: CustomerEventSubscriber = {
      subscribedTo: ['customer.created'],
      onEvent: vi.fn(),
    };

    router.register(mockSubscriber1);
    router.register(mockSubscriber2);

    await router.publish(mockCustomerCreatedEvent);

    expect(mockSubscriber1.onEvent).toHaveBeenCalledWith(mockCustomerCreatedEvent);
    expect(mockSubscriber2.onEvent).toHaveBeenCalledWith(mockCustomerCreatedEvent);
  });

  it('should not publish to subscribers not registered for the event', async () => {
    const mockSubscriber: CustomerEventSubscriber = {
      subscribedTo: ['customer.updated'],
      onEvent: vi.fn(),
    };

    router.register(mockSubscriber);

    await router.publish(mockCustomerCreatedEvent);

    expect(mockSubscriber.onEvent).not.toHaveBeenCalled();
  });
});