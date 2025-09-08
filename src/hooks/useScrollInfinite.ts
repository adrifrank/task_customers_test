import { useEffect, useCallback } from 'react';
import { createScrollHandler } from '@/lib/scroll';
import { UseScrollInfiniteProps } from '@/types/hooks';

export const useScrollInfinite = ({
  hasMore,
  loading,
  onLoadMore,
}: UseScrollInfiniteProps) => {
  const handleLoadMore = useCallback(() => {
    if (!hasMore || loading) return;
    onLoadMore();
  }, [hasMore, loading, onLoadMore]);

  useEffect(() => {
    const { addScrollListener, removeScrollListener } = createScrollHandler(
      { threshold: 772 },
      handleLoadMore
    );

    addScrollListener();

    return removeScrollListener;
  }, [handleLoadMore]);
};
