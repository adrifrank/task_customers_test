/**
 * Scroll utilities
 */

import { ScrollConfig } from '@/types/hooks';

export const createScrollHandler = (
  config: ScrollConfig,
  onScrollToBottom: () => void
) => {
  const threshold = config.threshold || 500;

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrolledToBottom =
      scrollTop + clientHeight >= scrollHeight - threshold;

    if (scrolledToBottom) {
      onScrollToBottom();
    }
  };

  const addScrollListener = () => {
    window.addEventListener('scroll', handleScroll, { passive: true });
  };

  const removeScrollListener = () => {
    window.removeEventListener('scroll', handleScroll);
  };

  return { addScrollListener, removeScrollListener };
};
