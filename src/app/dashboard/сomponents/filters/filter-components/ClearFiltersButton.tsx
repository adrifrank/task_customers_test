'use client';

import React from 'react';
import Icon from '@/components/ui/Icon';
import { ClearFiltersButtonProps } from '@/types/components';

export default function ClearFiltersButton({
  onClearFilters,
}: ClearFiltersButtonProps) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClearFilters}
        className="px-6 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors flex items-center space-x-2 shadow-sm"
      >
        <Icon name="close" className="w-4 h-4" />
        <span>Clear All Filters</span>
      </button>
    </div>
  );
}
