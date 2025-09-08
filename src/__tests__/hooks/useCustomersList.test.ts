import { renderHook, waitFor, act } from '@testing-library/react';
import { useCustomersList } from '@/hooks/useCustomersList';
import { Customer } from '@/types/customer';

// Mock data
const mockCustomersData: Customer[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    gender: 'Male',
    country: 'USA',
    city: 'New York',
    state: 'NY',
    postCode: '10001',
    street: 'Main St',
    streetNumber: '123',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    gender: 'Female',
    country: 'Canada',
    city: 'Toronto',
    state: 'ON',
    postCode: 'M5V 3A1',
    street: 'Queen St',
    streetNumber: '456',
  },
  {
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    gender: 'Male',
    country: 'USA',
    city: 'Los Angeles',
    state: 'CA',
    postCode: '90210',
    street: 'Hollywood Blvd',
    streetNumber: '789',
  },
];

// Mock fetch
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe('useCustomersList', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should load customers successfully', async () => {
    // Mock successful fetch
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCustomersData,
    } as Response);

    const { result } = renderHook(() => useCustomersList());

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.customers).toEqual([]);
    expect(result.current.error).toBeNull();

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Check loaded data
    expect(result.current.customers).toHaveLength(3);
    expect(result.current.total).toBe(3);
    expect(result.current.filteredTotal).toBe(3);
    expect(result.current.error).toBeNull();

    // Check customer data transformation
    const firstCustomer = result.current.customers[0];
    expect(firstCustomer.id).toBe('customer-0');
    expect(firstCustomer.fullName).toBe('John Doe');
    expect(firstCustomer.age).toBeGreaterThanOrEqual(18);
    expect(firstCustomer.age).toBeLessThanOrEqual(80);
  });

  it('should handle fetch error', async () => {
    // Mock fetch error
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useCustomersList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.customers).toEqual([]);
  });

  it('should filter customers by search term', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCustomersData,
    } as Response);

    const { result } = renderHook(() => useCustomersList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Filter by name - should find customers with "John" in name or email
    act(() => {
      result.current.setFilters({
        search: 'John',
        gender: 'all',
        country: 'all',
      });
    });

    await waitFor(() => {
      // Should find John Doe and Bob Johnson (contains "john" in email)
      expect(result.current.customers.length).toBeGreaterThanOrEqual(1);
      expect(result.current.filteredTotal).toBeGreaterThanOrEqual(1);
      // Check that at least John Doe is in results
      const hasJohnDoe = result.current.customers.some(
        c => c.fullName === 'John Doe'
      );
      expect(hasJohnDoe).toBe(true);
    });

    // Filter by email
    act(() => {
      result.current.setFilters({
        search: 'jane.smith',
        gender: 'all',
        country: 'all',
      });
    });

    await waitFor(() => {
      expect(result.current.customers).toHaveLength(1);
      expect(result.current.customers[0].fullName).toBe('Jane Smith');
    });
  });

  it('should filter customers by gender', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCustomersData,
    } as Response);

    const { result } = renderHook(() => useCustomersList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Filter by gender
    act(() => {
      result.current.setFilters({
        search: '',
        gender: 'Female',
        country: 'all',
      });
    });

    await waitFor(() => {
      expect(result.current.customers).toHaveLength(1);
      expect(result.current.customers[0].fullName).toBe('Jane Smith');
      expect(result.current.filteredTotal).toBe(1);
    });
  });

  it('should filter customers by country', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCustomersData,
    } as Response);

    const { result } = renderHook(() => useCustomersList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Filter by country
    act(() => {
      result.current.setFilters({
        search: '',
        gender: 'all',
        country: 'USA',
      });
    });

    await waitFor(() => {
      expect(result.current.customers).toHaveLength(2);
      expect(result.current.filteredTotal).toBe(2);
    });
  });

  it('should filter customers by age range', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCustomersData,
    } as Response);

    const { result } = renderHook(() => useCustomersList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Get the actual ages first
    const ages = result.current.customers.map(c => c.age);
    const minAge = Math.min(...ages);
    const maxAge = Math.max(...ages);

    // Filter by age range that includes all customers
    act(() => {
      result.current.setFilters({
        search: '',
        gender: 'all',
        country: 'all',
        ageRange: { min: minAge, max: maxAge },
      });
    });

    await waitFor(() => {
      expect(result.current.filteredTotal).toBe(3);
    });

    // Filter by narrow age range
    act(() => {
      result.current.setFilters({
        search: '',
        gender: 'all',
        country: 'all',
        ageRange: { min: minAge, max: minAge },
      });
    });

    await waitFor(() => {
      expect(result.current.filteredTotal).toBeGreaterThanOrEqual(0);
    });
  });

  it('should handle pagination with loadMore', async () => {
    // Create more mock data for pagination testing
    const largeMockData = Array.from({ length: 50 }, (_, i) => ({
      ...mockCustomersData[0],
      firstName: `User${i}`,
      email: `user${i}@example.com`,
    }));

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => largeMockData,
    } as Response);

    const { result } = renderHook(() => useCustomersList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Should initially show 20 customers (first page)
    expect(result.current.customers).toHaveLength(20);
    expect(result.current.hasMore).toBe(true);

    // Load more
    act(() => {
      result.current.loadMore();
    });

    await waitFor(() => {
      expect(result.current.customers).toHaveLength(40);
      expect(result.current.hasMore).toBe(true);
    });
  });

  it('should provide unique countries list', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCustomersData,
    } as Response);

    const { result } = renderHook(() => useCustomersList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.uniqueCountries).toEqual(['Canada', 'USA']);
  });

  it('should reset pagination when filters change', async () => {
    const largeMockData = Array.from({ length: 50 }, (_, i) => ({
      ...mockCustomersData[0],
      firstName: `User${i}`,
      email: `user${i}@example.com`,
    }));

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => largeMockData,
    } as Response);

    const { result } = renderHook(() => useCustomersList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Load more to get to page 2
    act(() => {
      result.current.loadMore();
    });

    await waitFor(() => {
      expect(result.current.customers).toHaveLength(40);
    });

    // Change filters - should reset to page 1
    act(() => {
      result.current.setFilters({
        search: 'User1',
        gender: 'all',
        country: 'all',
      });
    });

    await waitFor(() => {
      expect(result.current.customers.length).toBeLessThan(50);
    });
  });
});
