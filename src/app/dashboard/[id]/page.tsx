'use client';

import { useLazyOrders } from '@/hooks/useLazyOrders';
import { useCustomerDetails } from '@/hooks/useCustomerDetails';
import { useAsyncParams } from '@/hooks/useAsyncParams';
import { generateRoute } from '@/config/routes';
import UserProfile from './components/user-profile/UserProfile';
import OrderHistory from './components/user-order-history/OrderHistory';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import BackButton from '@/components/ui/BackButton';
import Alert from '@/components/ui/Alert';
import { CustomerDetailsPageProps } from '@/types/components';

export default function CustomerDetailsPage({
  params,
}: CustomerDetailsPageProps) {
  // Resolve async params
  const { params: resolvedParams, loading: paramsLoading } =
    useAsyncParams(params);
  const customerId = resolvedParams?.id || '';

  // Load customer data
  const {
    customer,
    loading: customerLoading,
    error,
  } = useCustomerDetails(customerId);

  // Load orders data
  const {
    orders,
    loading: ordersLoading,
    loadingMore,
    hasMore,
    totalOrders,
    loadMore,
  } = useLazyOrders({ customerId });

  const loading = paramsLoading || customerLoading;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSpinner
          size="lg"
          text="Loading customer details..."
          className="py-12"
        />
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <BackButton
          href={generateRoute.dashboard()}
          label="Back to Customer List"
        />

        <Alert
          variant="error"
          title="Error loading customer"
          message={error || 'Customer not found'}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <BackButton
        href={generateRoute.dashboard()}
        label="Back to Customer List"
      />

      {/* User Profile */}
      <UserProfile customer={customer} />

      {/* Order History (Senior Level Feature) */}
      <OrderHistory
        orders={orders}
        loading={ordersLoading}
        loadingMore={loadingMore}
        customerName={customer.fullName}
        hasMore={hasMore}
        totalOrders={totalOrders}
        onLoadMore={loadMore}
      />
    </div>
  );
}
