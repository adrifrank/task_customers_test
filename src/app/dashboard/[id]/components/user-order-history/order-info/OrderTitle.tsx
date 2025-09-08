import React from 'react';
import Icon from '@/components/ui/Icon';
import { OrderWithId } from '@/types/order';

const OrderTitle = ({
  orders,
  totalOrders,
  customerName,
}: {
  orders: OrderWithId[];
  totalOrders: number | undefined;
  customerName: string;
}) => {
  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 flex items-center">
        <Icon name="shoppingBag" className="w-6 h-6 mr-2 text-purple-600" />
        Order History
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        Showing {orders.length} of {totalOrders || orders.length} order
        {(totalOrders || orders.length) !== 1 ? 's' : ''} for {customerName}
      </p>
    </div>
  );
};

export default OrderTitle;
