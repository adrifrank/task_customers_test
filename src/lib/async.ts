/**
 * Utilities for working with async operations
 */

export const resolvePromise = async <T>(
  promise: Promise<T>
): Promise<{ data: T | null; error: string | null }> => {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    console.error('Error resolving promise:', error);
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
