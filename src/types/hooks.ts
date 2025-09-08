// Hook Types
export interface UseLazyOrdersProps {
  customerId: string;
  initialCount?: number;
}

export interface UseScrollInfiniteProps {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}

export interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

// Pagination Hook Options
export interface UsePaginationOptions {
  itemsPerPage: number;
  resetTrigger?: any; // Trigger for pagination reset
}

// Intersection Observer Configuration
export interface IntersectionObserverConfig {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

// Scroll Configuration
export interface ScrollConfig {
  threshold?: number; // distance from bottom in pixels
}
