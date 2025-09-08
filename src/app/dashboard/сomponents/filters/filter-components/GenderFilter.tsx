'use client';

import React from 'react';
import { CustomerFilters } from '@/types/customer';

import { GenderFilterProps } from '@/types/components';

const GENDER_OPTIONS = [
  { value: 'all', label: 'All Genders' },
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
  { value: 'Fluid', label: 'Fluid' },
] as const;

export default function GenderFilter({
  value,
  onGenderChange,
}: GenderFilterProps) {
  return (
    <div className="min-w-[160px]">
      <label
        htmlFor="gender"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Gender
      </label>
      <select
        id="gender"
        value={value || 'all'}
        onChange={e =>
          onGenderChange(e.target.value as CustomerFilters['gender'])
        }
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {GENDER_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
