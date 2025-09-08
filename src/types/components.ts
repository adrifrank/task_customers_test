import { ReactNode } from 'react';
import { CustomerWithId } from './customer';
import { OrderWithId } from './order';
import { CustomerFilters } from './customer';

// Dashboard Components
export interface CustomerCardProps {
  customer: CustomerWithId;
}

export interface CustomerListProps {
  customers: CustomerWithId[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  filteredTotal?: number;
}

// Filter Components
export interface FiltersProps {
  filters: CustomerFilters;
  onFiltersChange: (filters: CustomerFilters) => void;
  uniqueCountries: string[];
  totalResults: number;
  filteredResults: number;
}

export interface AgeRangeFilterProps {
  value: CustomerFilters['ageRange'];
  onAgeRangeChange: (ageRange: CustomerFilters['ageRange']) => void;
}

export interface GenderFilterProps {
  value: CustomerFilters['gender'];
  onGenderChange: (gender: CustomerFilters['gender']) => void;
}

export interface SearchFilterProps {
  value: string;
  onSearchChange: (search: string) => void;
}

export interface CountryFilterProps {
  value: string;
  uniqueCountries: string[];
  onCountryChange: (country: string) => void;
}

export interface ClearFiltersButtonProps {
  onClearFilters: () => void;
}

export interface ResultsCounterProps {
  totalResults: number;
  filteredResults: number;
  hasActiveFilters: boolean;
}

// User Details Components
export interface UserProfileProps {
  customer: CustomerWithId;
}

export interface OrderHistoryProps {
  orders: OrderWithId[];
  loading: boolean;
  loadingMore?: boolean;
  customerName: string;
  hasMore?: boolean;
  totalOrders?: number;
  onLoadMore?: () => void;
}

export interface OrderCardsProps {
  orders: OrderWithId[];
}

export interface OrderCardItemProps {
  order: OrderWithId;
}

// Page Components
export interface CustomerDetailsPageProps {
  params: Promise<{ id: string }>;
}
