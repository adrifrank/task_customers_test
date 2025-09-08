'use client';

import React from 'react';
import { CustomerFilters } from '@/types/customer';

import { AgeRangeFilterProps } from '@/types/components';

export default function AgeRangeFilter({
  value,
  onAgeRangeChange,
}: AgeRangeFilterProps) {
  const handleMinChange = (minValue: string) => {
    if (minValue === '') {
      // If min is empty but max exists, keep only max
      if (value?.max) {
        onAgeRangeChange({ min: 18, max: value.max });
      } else {
        // If both empty, remove the age filter entirely
        onAgeRangeChange(undefined);
      }
    } else {
      const minNum = Number(minValue);
      if (isNaN(minNum)) return;

      const min = Math.max(18, Math.min(80, minNum));
      const max = value?.max || 80;

      // Ensure min is not greater than max
      const validMax = Math.max(min, max);
      onAgeRangeChange({ min, max: validMax });
    }
  };

  const handleMaxChange = (maxValue: string) => {
    if (maxValue === '') {
      // If max is empty but min exists, keep only min
      if (value?.min) {
        onAgeRangeChange({ min: value.min, max: 80 });
      } else {
        // If both empty, remove the age filter entirely
        onAgeRangeChange(undefined);
      }
    } else {
      const maxNum = Number(maxValue);
      if (isNaN(maxNum)) return;

      const max = Math.max(18, Math.min(80, maxNum));
      const min = value?.min || 18;

      // Ensure max is not less than min
      const validMin = Math.min(min, max);
      onAgeRangeChange({ min: validMin, max });
    }
  };

  return (
    <div className="min-w-[200px]">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Age Range
      </label>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          placeholder="From"
          min={18}
          max={80}
          value={value?.min || ''}
          onChange={e => handleMinChange(e.target.value)}
          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
          title="Minimum age (18-80)"
        />
        <span className="text-gray-400">-</span>
        <input
          type="number"
          placeholder="To"
          min={value?.min || 18}
          max={80}
          value={value?.max || ''}
          onChange={e => handleMaxChange(e.target.value)}
          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
          title="Maximum age (18-80)"
        />
      </div>
      {value?.min && value?.max && value.min > value.max && (
        <p className="text-xs text-red-500 mt-1">
          Minimum age cannot be greater than maximum age
        </p>
      )}
    </div>
  );
}
