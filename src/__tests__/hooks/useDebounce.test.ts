import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce';

// Mock timers
jest.useFakeTimers();

describe('useDebounce', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));

    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    );

    expect(result.current).toBe('initial');

    // Change the value
    rerender({ value: 'updated', delay: 500 });

    // Value should not change immediately
    expect(result.current).toBe('initial');

    // Fast-forward time by 499ms (less than delay)
    act(() => {
      jest.advanceTimersByTime(499);
    });

    // Value should still be the old one
    expect(result.current).toBe('initial');

    // Fast-forward time by 1ms more (total 500ms)
    act(() => {
      jest.advanceTimersByTime(1);
    });

    // Value should now be updated
    expect(result.current).toBe('updated');
  });

  it('should reset timer when value changes again before delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    );

    // Change value to 'first'
    rerender({ value: 'first', delay: 500 });

    // Wait 300ms
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('initial');

    // Change value to 'second' before first delay completes
    rerender({ value: 'second', delay: 500 });

    // Wait another 300ms (total 600ms from initial, but only 300ms from second change)
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Should still be initial because second timer hasn't completed
    expect(result.current).toBe('initial');

    // Wait 200ms more to complete the second timer
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Should now be 'second'
    expect(result.current).toBe('second');
  });

  it('should handle different delay values', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 1000 },
      }
    );

    rerender({ value: 'updated', delay: 1000 });

    // Wait 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('initial');

    // Wait 500ms more (total 1000ms)
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should handle delay of 0', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 0 },
      }
    );

    rerender({ value: 'updated', delay: 0 });

    // With delay 0, should update immediately on next tick
    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(result.current).toBe('updated');
  });

  it('should work with different data types', () => {
    // Test with number
    const { result: numberResult, rerender: numberRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 0, delay: 100 },
      }
    );

    numberRerender({ value: 42, delay: 100 });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(numberResult.current).toBe(42);

    // Test with boolean
    const { result: boolResult, rerender: boolRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: false, delay: 100 },
      }
    );

    boolRerender({ value: true, delay: 100 });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(boolResult.current).toBe(true);

    // Test with object
    const initialObj = { name: 'initial' };
    const updatedObj = { name: 'updated' };

    const { result: objResult, rerender: objRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: initialObj, delay: 100 },
      }
    );

    objRerender({ value: updatedObj, delay: 100 });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(objResult.current).toBe(updatedObj);
  });

  it('should handle multiple rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 300 },
      }
    );

    // Rapid changes
    rerender({ value: 'change1', delay: 300 });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    rerender({ value: 'change2', delay: 300 });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    rerender({ value: 'change3', delay: 300 });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    rerender({ value: 'final', delay: 300 });

    // Should still be initial
    expect(result.current).toBe('initial');

    // Complete the final delay
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Should be the final value
    expect(result.current).toBe('final');
  });

  it('should cleanup timer on unmount', () => {
    const { unmount } = renderHook(() => useDebounce('test', 500));

    // Should not throw any errors when unmounting
    expect(() => unmount()).not.toThrow();
  });

  it('should handle changing delay value', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    );

    rerender({ value: 'updated', delay: 500 });

    // Wait 200ms
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Change delay to 1000ms while timer is running
    rerender({ value: 'updated', delay: 1000 });

    // Wait original remaining time (300ms)
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Should still be initial because new delay is longer
    expect(result.current).toBe('initial');

    // Wait the new delay time from the delay change
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Should now be updated
    expect(result.current).toBe('updated');
  });

  it('should handle undefined and null values', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 100 },
      }
    );

    rerender({ value: undefined, delay: 100 });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current).toBeUndefined();

    rerender({ value: null, delay: 100 });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current).toBeNull();
  });
});
