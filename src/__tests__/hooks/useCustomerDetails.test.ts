import { renderHook, waitFor } from '@testing-library/react';
import { useCustomerDetails } from '@/hooks/useCustomerDetails';
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
];

// Mock fetch
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe('useCustomerDetails', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should load customer details successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCustomersData,
    } as Response);

    const { result } = renderHook(() => useCustomerDetails('customer-0'));

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.customer).toBeNull();
    expect(result.current.error).toBeNull();

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Check loaded customer
    expect(result.current.customer).toBeDefined();
    expect(result.current.customer?.id).toBe('customer-0');
    expect(result.current.customer?.fullName).toBe('John Doe');
    expect(result.current.customer?.firstName).toBe('John');
    expect(result.current.customer?.lastName).toBe('Doe');
    expect(result.current.customer?.email).toBe('john.doe@example.com');
    expect(result.current.customer?.age).toBeGreaterThanOrEqual(18);
    expect(result.current.customer?.age).toBeLessThanOrEqual(80);
    expect(result.current.customer?.avatar).toContain('dicebear.com');
    expect(result.current.error).toBeNull();
  });

  it('should handle customer not found', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCustomersData,
    } as Response);

    const { result } = renderHook(() => useCustomerDetails('customer-999'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.customer).toBeNull();
    expect(result.current.error).toBe('Customer not found');
  });

  it('should handle fetch error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useCustomerDetails('customer-0'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.customer).toBeNull();
    expect(result.current.error).toBe('Network error');
  });

  it('should handle HTTP error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    const { result } = renderHook(() => useCustomerDetails('customer-0'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.customer).toBeNull();
    expect(result.current.error).toBe('Failed to load customers');
  });

  it('should not load when customerId is empty', () => {
    const { result } = renderHook(() => useCustomerDetails(''));

    expect(result.current.loading).toBe(true);
    expect(result.current.customer).toBeNull();
    expect(result.current.error).toBeNull();

    // Should not make any fetch calls
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should generate consistent age for same customer', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCustomersData,
    } as Response);

    const { result: result1 } = renderHook(() =>
      useCustomerDetails('customer-0')
    );

    await waitFor(() => {
      expect(result1.current.loading).toBe(false);
    });

    const age1 = result1.current.customer?.age;

    // Mock again for second call
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCustomersData,
    } as Response);

    const { result: result2 } = renderHook(() =>
      useCustomerDetails('customer-0')
    );

    await waitFor(() => {
      expect(result2.current.loading).toBe(false);
    });

    const age2 = result2.current.customer?.age;

    // Age should be consistent for the same customer
    expect(age1).toBe(age2);
  });

  it('should load different customer when customerId changes', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockCustomersData,
    } as Response);

    const { result, rerender } = renderHook(
      ({ customerId }) => useCustomerDetails(customerId),
      {
        initialProps: { customerId: 'customer-0' },
      }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.customer?.fullName).toBe('John Doe');

    // Change customer ID
    rerender({ customerId: 'customer-1' });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.customer?.fullName).toBe('Jane Smith');
  });
});
