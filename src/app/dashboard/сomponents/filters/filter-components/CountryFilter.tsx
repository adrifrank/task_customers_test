'use client';

import React from 'react';
import { CountryFilterProps } from '@/types/components';

export default function CountryFilter({
  value,
  uniqueCountries,
  onCountryChange,
}: CountryFilterProps) {
  return (
    <div className="min-w-[200px]">
      <label
        htmlFor="country"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Country
      </label>
      <select
        id="country"
        value={value || 'all'}
        onChange={e => onCountryChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="all">All Countries</option>
        {uniqueCountries.map(country => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
}
