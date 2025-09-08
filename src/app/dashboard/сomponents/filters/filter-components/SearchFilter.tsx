'use client';

import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Icon from '@/components/ui/Icon';
import { SearchFilterProps } from '@/types/components';

export default function SearchFilter({
  value,
  onSearchChange,
}: SearchFilterProps) {
  const [searchInput, setSearchInput] = useState(value || '');
  const debouncedSearch = useDebounce(searchInput, 300);
  const previousValue = useRef(value);

  // Sync with external value changes (like clear filters)
  useEffect(() => {
    if (value !== previousValue.current) {
      console.log(
        'SearchFilter: External value changed from',
        previousValue.current,
        'to',
        value
      );
      setSearchInput(value || '');
      previousValue.current = value;
    }
  }, [value]);

  // Handle debounced search changes
  useEffect(() => {
    // Only trigger onChange if the debounced value is different from the external value
    // and it's not the result of an external update
    if (
      debouncedSearch !== value &&
      debouncedSearch !== previousValue.current
    ) {
      onSearchChange(debouncedSearch);
    }
  }, [debouncedSearch, value, onSearchChange]);

  const isSearching = searchInput !== debouncedSearch;

  return (
    <div className="flex-1 max-w-md">
      <label
        htmlFor="search"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Search customers
      </label>
      <div className="relative">
        <input
          type="text"
          id="search"
          placeholder="Search by name or email..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          {isSearching ? (
            <LoadingSpinner size="sm" centered={false} />
          ) : (
            <Icon name="search" className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
}
