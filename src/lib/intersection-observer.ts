/**
 * Utilities for working with Intersection Observer API
 */

import { IntersectionObserverConfig } from '@/types/hooks';

export const createIntersectionObserver = (
  config: IntersectionObserverConfig,
  onIntersectionChange: (isIntersecting: boolean) => void
) => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      onIntersectionChange(entry.isIntersecting);
    },
    {
      threshold: config.threshold || 0.1,
      root: config.root || null,
      rootMargin: config.rootMargin || '0px',
    }
  );

  const observe = (element: Element) => {
    observer.observe(element);
  };

  const unobserve = (element: Element) => {
    observer.unobserve(element);
  };

  const disconnect = () => {
    observer.disconnect();
  };

  return { observe, unobserve, disconnect };
};
