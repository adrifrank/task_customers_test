'use client';

import React from 'react';
import { OrderWithId } from '@/types/order';
import { OrderCardsProps, OrderCardItemProps } from '@/types/components';

const OrderCardItem = ({ order }: OrderCardItemProps) => (
  <div className="p-4">
    {/* Header with order number and price */}
    <div className="flex justify-between items-start mb-3">
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900">#{order.number}</h3>
        <p className="text-sm text-gray-600 mt-1">{order.itemName}</p>
      </div>
      <div className="text-right ml-4">
        <p className="text-lg font-semibold text-gray-900">
          {order.formattedPrice}
        </p>
        <p className="text-sm text-gray-500">Qty: {order.amount}</p>
      </div>
    </div>

    {/* Order details */}
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <p className="text-gray-500 mb-1">Order Date:</p>
        <p className="font-medium text-gray-900">{order.formattedCreatedAt}</p>
      </div>
      <div>
        <p className="text-gray-500 mb-1">Shipped Date:</p>
        <p className="font-medium text-gray-900">{order.formattedShippedAt}</p>
      </div>
    </div>
  </div>
);

const OrderCards = ({ orders }: OrderCardsProps) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="md:hidden p-4 text-center text-gray-500">
        No orders found
      </div>
    );
  }

  return (
    <div className="md:hidden">
      <div className="divide-y divide-gray-200 bg-white rounded-lg shadow-sm border border-gray-200">
        {orders.map(order => (
          <OrderCardItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderCards;
