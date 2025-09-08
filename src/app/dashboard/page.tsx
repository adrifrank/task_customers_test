'use client';

import { useCustomersList } from '@/hooks/useCustomersList';
import Filters from './сomponents/filters/Filters';
import CustomerList from './сomponents/customer-list/CustomerList';
import Alert from '@/components/ui/Alert';
import SectionHeader from '@/components/ui/SectionHeader';

export default function DashboardPage() {
  const {
    customers,
    filteredTotal,
    total,
    loading,
    error,
    filters,
    setFilters,
    loadMore,
    hasMore,
    uniqueCountries,
  } = useCustomersList();

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert
          variant="error"
          title="Error loading customers"
          message={error}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <SectionHeader
        title="Customer Dashboard"
        description="Manage and view your customer database with advanced filtering and search capabilities."
      />

      {/* Filters */}
      <Filters
        filters={filters}
        onFiltersChange={setFilters}
        uniqueCountries={uniqueCountries}
        totalResults={total}
        filteredResults={filteredTotal}
      />

      {/* Customer List */}
      <CustomerList
        customers={customers}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        filteredTotal={filteredTotal}
      />
    </div>
  );
}
