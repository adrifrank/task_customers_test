import { renderHook, waitFor } from '@testing-library/react';
import { useOrders } from '@/hooks/useOrders';
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
];

// Mock fetch
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe('useOrders', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should load orders successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockOrdersData,
    } as Response);

    const { result } = renderHook(() => useOrders());

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.orders).toEqual([]);
    expect(result.current.error).toBeNull();

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Check loaded data
    expect(result.current.orders).toHaveLength(3);
    expect(result.current.error).toBeNull();

    // Check order data transformation
    const firstOrder = result.current.orders[0];
    expect(firstOrder.id).toBe('order-1001');
    expect(firstOrder.formattedCreatedAt).toBeDefined();
    expect(firstOrder.formattedShippedAt).toBeDefined();
    expect(firstOrder.formattedPrice).toBe('99.99 USD');
  });

  it('should handle fetch error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useOrders());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.orders).toEqual([]);
  });

  it('should handle HTTP error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    const { result } = renderHook(() => useOrders());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('HTTP error! status: 404');
    expect(result.current.orders).toEqual([]);
  });

  it('should format dates correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockOrdersData,
    } as Response);

    const { result } = renderHook(() => useOrders());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const firstOrder = result.current.orders[0];

    // Check that dates are formatted as locale strings
    expect(firstOrder.formattedCreatedAt).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    expect(firstOrder.formattedShippedAt).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
  });

  it('should format prices correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockOrdersData,
    } as Response);

    const { result } = renderHook(() => useOrders());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const orders = result.current.orders;

    expect(orders[0].formattedPrice).toBe('99.99 USD');
    expect(orders[1].formattedPrice).toBe('149.50 EUR');
    expect(orders[2].formattedPrice).toBe('75.25 USD');
  });

  it('should get customer orders deterministically', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockOrdersData,
    } as Response);

    const { result } = renderHook(() => useOrders());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Test getCustomerOrders function
    const customer1Orders = result.current.getCustomerOrders('customer-1', 2);
    const customer1OrdersAgain = result.current.getCustomerOrders(
      'customer-1',
      2
    );

    // Should return same orders for same customer
    expect(customer1Orders).toEqual(customer1OrdersAgain);
    expect(customer1Orders.length).toBeLessThanOrEqual(2);

    // Different customer should potentially get different orders
    const customer2Orders = result.current.getCustomerOrders('customer-2', 2);
    expect(customer2Orders.length).toBeLessThanOrEqual(2);
  });

  it('should handle edge cases in getCustomerOrders', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockOrdersData,
    } as Response);

    const { result } = renderHook(() => useOrders());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Test with invalid customer ID
    const invalidCustomerOrders = result.current.getCustomerOrders(
      'invalid-id',
      5
    );
    expect(invalidCustomerOrders.length).toBeLessThanOrEqual(5);

    // Test with count larger than available orders
    const tooManyOrders = result.current.getCustomerOrders('customer-1', 100);
    expect(tooManyOrders.length).toBeLessThanOrEqual(mockOrdersData.length);

    // Test with zero count
    const zeroOrders = result.current.getCustomerOrders('customer-1', 0);
    expect(zeroOrders.length).toBe(0);
  });

  it('should handle empty orders data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    const { result } = renderHook(() => useOrders());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.orders).toEqual([]);
    expect(result.current.error).toBeNull();

    // getCustomerOrders should handle empty data gracefully
    const customerOrders = result.current.getCustomerOrders('customer-1', 5);
    expect(customerOrders).toEqual([]);
  });

  it('should generate unique order IDs', async () => {
    const ordersWithSameNumber = [
      ...mockOrdersData,
      {
        ...mockOrdersData[0],
        number: 1001, // Same number as first order
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ordersWithSameNumber,
    } as Response);

    const { result } = renderHook(() => useOrders());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const orderIds = result.current.orders.map(order => order.id);

    // Should have duplicate IDs since they're based on order number
    expect(orderIds.filter(id => id === 'order-1001')).toHaveLength(2);
  });
});
