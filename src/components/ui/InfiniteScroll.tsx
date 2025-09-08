'use client';

import { useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useScrollInfinite } from '@/hooks/useScrollInfinite';
import LoadingSpinner from './LoadingSpinner';
import Alert from './Alert';

import { InfiniteScrollProps } from '@/types/ui';

export default function InfiniteScroll({
  hasMore,
  loading,
  onLoadMore,
  itemCount,
  loadingText = 'Loading more items...',
  endMessage = "You've reached the end of the list",
  className = '',
}: InfiniteScrollProps) {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '772px',
  });

  // Also use scroll listener as fallback
  useScrollInfinite({
    hasMore,
    loading,
    onLoadMore,
  });

  // Load more when intersection is detected
  useEffect(() => {
    if (isIntersecting && hasMore && !loading && itemCount > 0) {
      onLoadMore();
    }
  }, [isIntersecting, hasMore, loading, onLoadMore, itemCount]);

  return (
    <div className={className}>
      {/* Loading Indicator */}
      {loading && <LoadingSpinner text={loadingText} />}

      {/* Intersection Observer Target */}
      {hasMore && !loading && (
        <div
          ref={targetRef}
          className="h-10 flex items-center justify-center my-4"
        >
          <div className="text-gray-400 text-sm">{loadingText}</div>
        </div>
      )}

      {/* End of List Indicator */}
      {!hasMore && itemCount > 0 && (
        <div className="text-center py-8">
          <Alert
            variant="success"
            message={endMessage}
            className="inline-block text-sm"
          />
        </div>
      )}
    </div>
  );
}
