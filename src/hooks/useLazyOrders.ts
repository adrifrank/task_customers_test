import { useState, useEffect, useCallback } from 'react';
import {
  fetchOrders,
  transformOrdersData,
  getCustomerOrders,
  paginateOrders,
  simulateLoadingDelay,
} from '@/lib/order';
import { OrderWithId } from '@/types/order';
import { UseLazyOrdersProps } from '@/types/hooks';

const ORDERS_PER_PAGE = 5;

export const useLazyOrders = ({
  customerId,
  initialCount = ORDERS_PER_PAGE,
}: UseLazyOrdersProps) => {
  const [allOrders, setAllOrders] = useState<OrderWithId[]>([]);
  const [displayedOrders, setDisplayedOrders] = useState<OrderWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Load all orders once
  useEffect(() => {
    const loadAllOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchOrders();
        const ordersWithId = transformOrdersData(data);

        // Get customer-specific orders (deterministic "random" selection)
        const customerOrders = getCustomerOrders(ordersWithId, customerId);

        setAllOrders(customerOrders);

        // Initially show first page
        setDisplayedOrders(customerOrders.slice(0, initialCount));
      } catch (err) {
        console.error('Error loading orders:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    if (customerId) {
      loadAllOrders();
    }
  }, [customerId, initialCount]);

  // Load more orders
  const loadMore = useCallback(async () => {
    if (loadingMore || displayedOrders.length >= allOrders.length) return;

    setLoadingMore(true);

    // Simulate network delay for realistic experience
    await simulateLoadingDelay();

    const nextPage = currentPage + 1;
    const newDisplayedOrders = paginateOrders(
      allOrders,
      nextPage,
      ORDERS_PER_PAGE
    );
    setDisplayedOrders(newDisplayedOrders);
    setCurrentPage(nextPage);
    setLoadingMore(false);
  }, [allOrders, currentPage, displayedOrders.length, loadingMore]);

  const hasMore = displayedOrders.length < allOrders.length;
  const totalOrders = allOrders.length;

  return {
    orders: displayedOrders,
    loading,
    loadingMore,
    error,
    hasMore,
    totalOrders,
    loadMore,
  };
};
