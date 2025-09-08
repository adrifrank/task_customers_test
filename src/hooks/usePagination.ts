import { useState, useCallback, useMemo, useEffect } from 'react';
import { UsePaginationOptions } from '@/types/hooks';

export const usePagination = <T>(items: T[], options: UsePaginationOptions) => {
  const { itemsPerPage, resetTrigger } = options;

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Reset page when trigger changes (e.g., filters)
  const [initialTrigger, setInitialTrigger] = useState(resetTrigger);
  
  useEffect(() => {
    // Only reset if trigger has actually changed from initial value
    if (resetTrigger !== undefined && resetTrigger !== initialTrigger) {
      setCurrentPage(1);
      setInitialTrigger(resetTrigger);
    }
  }, [resetTrigger, initialTrigger]);

  // Get displayed items (from first page to current)
  const paginatedItems = useMemo(() => {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  // Check if there are more items to load
  const hasMore = currentPage * itemsPerPage < items.length;

  // Function to load more items
  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;

    const nextPage = currentPage + 1;
    const maxItems = nextPage * itemsPerPage;

    if (maxItems <= items.length) {
      setIsLoadingMore(true);
      setCurrentPage(nextPage);
      // Reset loading state after a short delay
      setTimeout(() => setIsLoadingMore(false), 300);
    }
  }, [currentPage, itemsPerPage, items.length, isLoadingMore, hasMore]);

  return {
    currentPage,
    paginatedItems,
    hasMore,
    isLoadingMore,
    loadMore,
  };
};
