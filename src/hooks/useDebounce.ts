import { useState, useEffect } from 'react';
import { createDebounceValue } from '@/lib/debounce';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const { updateValue, cleanup } = createDebounceValue(
      value,
      delay,
      setDebouncedValue
    );

    updateValue(value);

    return cleanup;
  }, [value, delay]);

  return debouncedValue;
}
