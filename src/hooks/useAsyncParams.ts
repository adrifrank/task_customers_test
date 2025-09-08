'use client';

import { useState, useEffect } from 'react';
import { resolvePromise } from '@/lib/async';

export const useAsyncParams = <T>(params: Promise<T>) => {
  const [resolvedParams, setResolvedParams] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resolveParams = async () => {
      const { data } = await resolvePromise(params);
      setResolvedParams(data);
      setLoading(false);
    };

    resolveParams();
  }, [params]);

  return {
    params: resolvedParams,
    loading,
  };
};
