/**
 * Utility for debouncing values
 */

export const createDebounceValue = <T>(
  initialValue: T,
  delay: number,
  onValueChange: (value: T) => void
) => {
  let timeoutId: NodeJS.Timeout;

  const updateValue = (newValue: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      onValueChange(newValue);
    }, delay);
  };

  const cleanup = () => {
    clearTimeout(timeoutId);
  };

  return { updateValue, cleanup };
};
