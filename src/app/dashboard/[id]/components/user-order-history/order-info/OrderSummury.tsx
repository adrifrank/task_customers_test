import React from 'react';
import { OrderWithId } from '@/types/order';

const OrderSummury = ({
  totalOrders,
  orders,
}: {
  totalOrders?: number;
  orders: OrderWithId[];
}) => {
  return (
    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Total Orders:{' '}
          <span className="font-medium">{totalOrders || orders.length}</span>
        </span>
        <span className="text-sm text-gray-600">
          Total Value:{' '}
          <span className="font-medium">
            {orders.reduce((sum, order) => sum + order['price '], 0).toFixed(2)}{' '}
            USD
          </span>
        </span>
      </div>
    </div>
  );
};

export default OrderSummury;
