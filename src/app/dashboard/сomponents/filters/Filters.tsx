'use client';

import React from 'react';
import { CustomerFilters } from '@/types/customer';
import SearchFilter from './filter-components/SearchFilter';
import GenderFilter from './filter-components/GenderFilter';
import CountryFilter from './filter-components/CountryFilter';
import AgeRangeFilter from './filter-components/AgeRangeFilter';
import ClearFiltersButton from './filter-components/ClearFiltersButton';
import ResultsCounter from './filter-components/ResultsCounter';

import { FiltersProps } from '@/types/components';

export default function Filters({
  filters,
  onFiltersChange,
  uniqueCountries,
  totalResults,
  filteredResults,
}: FiltersProps) {
  const handleSearchChange = (search: string) => {
    onFiltersChange({
      ...filters,
      search,
    });
  };

  const handleGenderChange = (gender: CustomerFilters['gender']) => {
    onFiltersChange({
      ...filters,
      gender,
    });
  };

  const handleCountryChange = (country: string) => {
    onFiltersChange({
      ...filters,
      country,
    });
  };

  const handleAgeRangeChange = (ageRange: CustomerFilters['ageRange']) => {
    onFiltersChange({
      ...filters,
      ageRange,
    });
  };

  const clearFilters = () => {
    const resetFilters: CustomerFilters = {
      search: '',
      gender: 'all',
      country: 'all',
      ageRange: undefined,
    };
    onFiltersChange(resetFilters);
  };

  const hasActiveFilters =
    !!filters.search ||
    filters.gender !== 'all' ||
    filters.country !== 'all' ||
    !!filters.ageRange;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Search */}
          <SearchFilter
            key={`search-${filters.search || 'empty'}`}
            value={filters.search ?? ''}
            onSearchChange={handleSearchChange}
          />

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <GenderFilter
              key={`gender-${filters.gender || 'all'}`}
              value={filters.gender || 'all'}
              onGenderChange={handleGenderChange}
            />

            <CountryFilter
              key={`country-${filters.country || 'all'}`}
              value={filters.country || 'all'}
              uniqueCountries={uniqueCountries}
              onCountryChange={handleCountryChange}
            />

            <AgeRangeFilter
              key={`age-${filters.ageRange?.min || 'none'}-${filters.ageRange?.max || 'none'}`}
              value={filters.ageRange}
              onAgeRangeChange={handleAgeRangeChange}
            />
          </div>
        </div>

        {/* Clear Filters Button - separate row */}
        {hasActiveFilters && (
          <ClearFiltersButton onClearFilters={clearFilters} />
        )}
      </div>

      {/* Results Counter */}
      <ResultsCounter
        totalResults={totalResults}
        filteredResults={filteredResults}
        hasActiveFilters={hasActiveFilters}
      />
    </div>
  );
}
