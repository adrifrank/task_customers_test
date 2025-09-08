import { useEffect, useRef, useState } from 'react';
import { createIntersectionObserver } from '@/lib/intersection-observer';
import { UseIntersectionObserverProps } from '@/types/hooks';

export const useIntersectionObserver = ({
  threshold = 0.1,
  root = null,
  rootMargin = '0px',
}: UseIntersectionObserverProps = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { observe, unobserve } = createIntersectionObserver(
      { threshold, root, rootMargin },
      setIsIntersecting
    );

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        unobserve(currentTarget);
      }
    };
  }, [threshold, root, rootMargin]);

  return { targetRef, isIntersecting };
};
