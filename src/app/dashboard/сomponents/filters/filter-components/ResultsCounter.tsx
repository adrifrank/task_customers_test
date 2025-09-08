'use client';

import React from 'react';
import { ResultsCounterProps } from '@/types/components';

export default function ResultsCounter({
  totalResults,
  filteredResults,
  hasActiveFilters,
}: ResultsCounterProps) {
  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <p className="text-sm text-gray-600">
        Showing{' '}
        <span className="font-medium">{filteredResults.toLocaleString()}</span>{' '}
        of <span className="font-medium">{totalResults.toLocaleString()}</span>{' '}
        customers
        {hasActiveFilters && (
          <span className="ml-2 text-blue-600">(filtered)</span>
        )}
      </p>
    </div>
  );
}
