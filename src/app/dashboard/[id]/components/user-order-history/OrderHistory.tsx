import { OrderWithId } from '@/types/order';
import OrdersNotFound from './order-info/OrderNotFound';
import OrderTable from './order-info/OrderTable';
import OrderCards from './order-info/OrderCards';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Icon from '@/components/ui/Icon';
import OrderSummury from './order-info/OrderSummury';
import OrderTitle from './order-info/OrderTitle';
import { OrderHistoryProps } from '@/types/components';

export default function OrderHistory({
  orders,
  loading,
  loadingMore = false,
  customerName,
  hasMore = false,
  totalOrders,
  onLoadMore,
}: OrderHistoryProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Order History
        </h2>
        <LoadingSpinner text="Loading order history..." />
      </div>
    );
  }

  if (orders.length === 0) {
    return <OrdersNotFound customerName={customerName} />;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <OrderTitle
        orders={orders}
        totalOrders={totalOrders}
        customerName={customerName}
      />

      {/* Desktop Table View */}
      <OrderTable orders={orders} />
      {/* Mobile Card View */}
      <OrderCards orders={orders} />

      {/* Load More Button */}
      {hasMore && onLoadMore && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex justify-center">
            <button
              onClick={onLoadMore}
              disabled={loadingMore}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loadingMore ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Loading more orders...
                </>
              ) : (
                <>
                  <Icon name="plus" className="w-4 h-4 mr-2" />
                  Load More Orders
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Summary */}
      <OrderSummury totalOrders={totalOrders} orders={orders} />
    </div>
  );
}
