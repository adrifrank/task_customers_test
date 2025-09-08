'use client';

import React from 'react';
import CustomerCard from '../customer-card/CustomerCard';
import Alert from '@/components/ui/Alert';
import Icon from '@/components/ui/Icon';
import InfiniteScroll from '@/components/ui/InfiniteScroll';

import { CustomerListProps } from '@/types/components';

export default function CustomerList({
  customers,
  loading,
  hasMore,
  onLoadMore,
  filteredTotal,
}: CustomerListProps) {
  if (customers.length === 0 && !loading) {
    return (
      <Alert
        icon={<Icon name="users" />}
        iconSize="lg"
        centered
        title="No customers found"
        message="Try adjusting your search criteria or filters."
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Customer count information */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {customers.length} of {filteredTotal || customers.length}{' '}
          customers
        </div>
      </div>

      {/* Responsive customer grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 auto-rows-fr">
        {customers.map(customer => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>

      {/* Infinite scroll */}
      <InfiniteScroll
        hasMore={hasMore}
        loading={loading}
        onLoadMore={onLoadMore}
        itemCount={customers.length}
        loadingText="Loading customers..."
        endMessage="You've reached the end of the list"
      />
    </div>
  );
}
