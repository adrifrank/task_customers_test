import { useState, useEffect } from 'react';
import {
  fetchOrders,
  transformOrdersData,
  getRandomCustomerOrders,
} from '@/lib/order';
import { OrderWithId } from '@/types/order';

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchOrders();
        const ordersWithId = transformOrdersData(data);
        setOrders(ordersWithId);
      } catch (err) {
        console.error('Error loading orders:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  // Get random orders for a customer (since we don't have customer-order relationship)
  const getCustomerOrders = (customerId: string, count: number = 10) => {
    return getRandomCustomerOrders(orders, customerId, count);
  };

  return {
    orders,
    loading,
    error,
    getCustomerOrders,
  };
};
