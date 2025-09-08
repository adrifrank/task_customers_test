'use client';

import { useState, useEffect } from 'react';
import { fetchCustomers, findCustomerById } from '@/lib/customer';
import { CustomerWithId } from '@/types/customer';

export const useCustomerDetails = (customerId: string) => {
  const [customer, setCustomer] = useState<CustomerWithId | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!customerId) return;

    const loadCustomer = async () => {
      try {
        setLoading(true);
        setError(null);

        const customers = await fetchCustomers();
        const customerData = findCustomerById(customers, customerId);

        if (!customerData) {
          throw new Error('Customer not found');
        }

        setCustomer(customerData);
      } catch (err) {
        console.error('Error loading customer:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadCustomer();
  }, [customerId]);

  return {
    customer,
    loading,
    error,
  };
};
