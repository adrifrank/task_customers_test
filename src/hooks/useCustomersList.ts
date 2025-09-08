import { useState, useEffect, useMemo } from 'react';
import {
  fetchCustomers,
  transformCustomersData,
  filterCustomers,
  getUniqueCountries,
} from '@/lib/customer';
import { CustomerWithId, CustomerFilters } from '@/types/customer';
import { usePagination } from './usePagination';

const ITEMS_PER_PAGE = 20;

export const useCustomersList = () => {
  const [customers, setCustomers] = useState<CustomerWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CustomerFilters>({
    search: '',
    gender: 'all',
    country: 'all',
  });

  // Load customers data
  useEffect(() => {
    const loadCustomers = async () => {
      try {
        setLoading(true);
        const data = await fetchCustomers();
        const customersWithId = transformCustomersData(data);
        setCustomers(customersWithId);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  // Filter customers based on current filters
  const filteredCustomers = useMemo(() => {
    return filterCustomers(customers, filters);
  }, [customers, filters]);

  // Pagination with automatic reset on filter changes
  const filtersKey = useMemo(() => {
    return `${filters.search}-${filters.gender}-${filters.country}-${filters.ageRange?.min || ''}-${filters.ageRange?.max || ''}`;
  }, [filters]);
  
  const pagination = usePagination(filteredCustomers, {
    itemsPerPage: ITEMS_PER_PAGE,
    resetTrigger: filtersKey, // Reset pagination when filters change
  });

  // Get unique countries for filter dropdown
  const uniqueCountries = useMemo(() => {
    return getUniqueCountries(customers);
  }, [customers]);

  return {
    customers: pagination.paginatedItems,
    filteredTotal: filteredCustomers.length,
    total: customers.length,
    loading: loading || pagination.isLoadingMore,
    error,
    filters,
    setFilters,
    loadMore: pagination.loadMore,
    hasMore: pagination.hasMore,
    uniqueCountries,
  };
};
