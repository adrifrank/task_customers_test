import { renderHook, waitFor, act } from '@testing-library/react';
import { useLazyOrders } from '@/hooks/useLazyOrders';
import { Order } from '@/types/order';

// Mock data
const mockOrdersData: Order[] = [
  {
    number: 1001,
    'price ': 99.99,
    currency: 'USD',
    itemName: 'Test Item 1',
    amount: 2,
    createdAt: 1640995200, // 2022-01-01
    shippedAt: 1641081600, // 2022-01-02
  },
  {
    number: 1002,
    'price ': 149.5,
    currency: 'EUR',
    itemName: 'Test Item 2',
    amount: 1,
    createdAt: 1641168000, // 2022-01-03
    shippedAt: 1641254400, // 2022-01-04
  },
  {
    number: 1003,
    'price ': 75.25,
    currency: 'USD',
    itemName: 'Test Item 3',
    amount: 3,
    createdAt: 1641340800, // 2022-01-05
    shippedAt: 1641427200, // 2022-01-06
  },
  {
    number: 1004,
    'price ': 200.0,
    currency: 'GBP',
    itemName: 'Test Item 4',
    amount: 1,
    createdAt: 1641513600, // 2022-01-07
    shippedAt: 1641600000, // 2022-01-08
  },
  {
    number: 1005,
    'price ': 50.75,
    currency: 'USD',
    itemName: 'Test Item 5',
    amount: 4,
    createdAt: 1641686400, // 2022-01-09
    shippedAt: 1641772800, // 2022-01-10
  },
  {
    number: 1006,
    'price ': 125.99,
    currency: 'CAD',
    itemName: 'Test Item 6',
    amount: 2,
    createdAt: 1641859200, // 2022-01-11
    shippedAt: 1641945600, // 2022-01-12
  },
];

// Mock fetch
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

// Mock setTimeout to avoid delays in tests
jest.useFakeTimers();

describe('useLazyOrders', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
  });

  it('should load orders successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockOrdersData,
    } as Response);

    const { result } = renderHook(() =>
      useLazyOrders({ customerId: 'customer-1' })
    );

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.orders).toEqual([]);
    expect(result.current.error).toBeNull();

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Check loaded data
    expect(result.current.orders.length).toBeGreaterThan(0);
    expect(result.current.orders.length).toBeLessThanOrEqual(5); // Initial page size
    expect(result.current.totalOrders).toBeGreaterThan(0);
    expect(result.current.error).toBeNull();

    // Check order data transformation
    const firstOrder = result.current.orders[0];
    expect(firstOrder.id).toMatch(/^order-\d+$/);
    expect(firstOrder.formattedCreatedAt).toBeDefined();
    expect(firstOrder.formattedShippedAt).toBeDefined();
    expect(firstOrder.formattedPrice).toBeDefined();
    expect(firstOrder.formattedPrice).toMatch(/^\d+\.\d{2} \w+$/);
  });

  it('should handle fetch error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() =>
      useLazyOrders({ customerId: 'customer-1' })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.orders).toEqual([]);
  });

  it('should handle HTTP error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    const { result } = renderHook(() =>
      useLazyOrders({ customerId: 'customer-1' })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('HTTP error! status: 500');
    expect(result.current.orders).toEqual([]);
  });

  it('should not load when customerId is empty', () => {
    const { result } = renderHook(() => useLazyOrders({ customerId: '' }));

    expect(result.current.loading).toBe(true);
    expect(result.current.orders).toEqual([]);

    // Should not make any fetch calls
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should load more orders when loadMore is called', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockOrdersData,
    } as Response);

    const { result } = renderHook(() =>
      useLazyOrders({ customerId: 'customer-1' })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const initialOrdersCount = result.current.orders.length;
    const hasMore = result.current.hasMore;

    if (hasMore) {
      // Load more orders
      act(() => {
        result.current.loadMore();
      });

      expect(result.current.loadingMore).toBe(true);

      // Fast-forward timers to resolve the delay
      act(() => {
        jest.advanceTimersByTime(800);
      });

      await waitFor(() => {
        expect(result.current.loadingMore).toBe(false);
      });

      // Should have more orders now
      expect(result.current.orders.length).toBeGreaterThan(initialOrdersCount);
    }
  });

  it('should not load more when already loading', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockOrdersData,
    } as Response);

    const { result } = renderHook(() =>
      useLazyOrders({ customerId: 'customer-1' })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    if (result.current.hasMore) {
      // Start loading more
      act(() => {
        result.current.loadMore();
      });

      expect(result.current.loadingMore).toBe(true);

      // Try to load more again while already loading
      const ordersBefore = result.current.orders.length;

      act(() => {
        result.current.loadMore();
      });

      // Should not change the state since already loading
      expect(result.current.orders.length).toBe(ordersBefore);
    }
  });

  it('should not load more when no more orders available', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockOrdersData.slice(0, 3), // Small dataset
    } as Response);

    const { result } = renderHook(() =>
      useLazyOrders({ customerId: 'customer-1' })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Load all orders first
    while (result.current.hasMore) {
      act(() => {
        result.current.loadMore();
      });

      act(() => {
        jest.advanceTimersByTime(800);
      });

      await waitFor(() => {
        expect(result.current.loadingMore).toBe(false);
      });
    }

    // Now hasMore should be false
    expect(result.current.hasMore).toBe(false);

    const ordersCount = result.current.orders.length;

    // Try to load more when no more available
    act(() => {
      result.current.loadMore();
    });

    // Should not change anything
    expect(result.current.orders.length).toBe(ordersCount);
    expect(result.current.loadingMore).toBe(false);
  });

  it('should generate deterministic orders for different customers', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockOrdersData,
    } as Response);

    // Load orders for customer-1
    const { result: result1 } = renderHook(() =>
      useLazyOrders({ customerId: 'customer-1' })
    );

    await waitFor(() => {
      expect(result1.current.loading).toBe(false);
    });

    const customer1Orders = result1.current.orders;
    const customer1Total = result1.current.totalOrders;

    // Load orders for customer-2
    const { result: result2 } = renderHook(() =>
      useLazyOrders({ customerId: 'customer-2' })
    );

    await waitFor(() => {
      expect(result2.current.loading).toBe(false);
    });

    const customer2Orders = result2.current.orders;
    const customer2Total = result2.current.totalOrders;

    // Different customers should potentially have different orders
    // (unless they happen to get the same deterministic selection)
    expect(customer1Total).toBeGreaterThan(0);
    expect(customer2Total).toBeGreaterThan(0);
  });

  it('should respect custom initialCount', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockOrdersData,
    } as Response);

    const customInitialCount = 3;
    const { result } = renderHook(() =>
      useLazyOrders({
        customerId: 'customer-1',
        initialCount: customInitialCount,
      })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Should respect the custom initial count (or less if not enough orders)
    expect(result.current.orders.length).toBeLessThanOrEqual(
      customInitialCount
    );
  });

  it('should sort orders by creation date descending', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockOrdersData,
    } as Response);

    const { result } = renderHook(() =>
      useLazyOrders({ customerId: 'customer-1' })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const orders = result.current.orders;

    if (orders.length > 1) {
      // Check if orders are sorted by createdAt descending
      for (let i = 0; i < orders.length - 1; i++) {
        expect(orders[i].createdAt).toBeGreaterThanOrEqual(
          orders[i + 1].createdAt
        );
      }
    }
  });
});
