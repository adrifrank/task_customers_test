/**
 * Order data logic
 */
import { Order, OrderWithId } from '@/types/order';

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await fetch('/orders.json');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const transformOrderData = (order: Order): OrderWithId => {
  return {
    ...order,
    id: `order-${order.number}`,
    formattedCreatedAt: new Date(order.createdAt * 1000).toLocaleDateString(),
    formattedShippedAt: new Date(order.shippedAt * 1000).toLocaleDateString(),
    formattedPrice: `${order['price '].toFixed(2)} ${order.currency}`,
  };
};

export const transformOrdersData = (orders: Order[]): OrderWithId[] => {
  return orders.map(transformOrderData);
};

export const getCustomerOrders = (
  orders: OrderWithId[],
  customerId: string,
  maxCount: number = 15
): OrderWithId[] => {
  // Use customer ID to create deterministic "random" selection
  const seed = customerId.split('-')[1] || '0';
  const seedNum = parseInt(seed) || 0;
  const orderCount = Math.min(maxCount, Math.max(5, seedNum % 16)); // 5-15 orders per customer
  const startIndex = seedNum % Math.max(1, orders.length - orderCount);

  return orders
    .slice(startIndex, startIndex + orderCount)
    .sort((a, b) => b.createdAt - a.createdAt); // Sort by date descending
};

export const getRandomCustomerOrders = (
  orders: OrderWithId[],
  customerId: string,
  count: number = 10
): OrderWithId[] => {
  // Use customer ID to create deterministic "random" selection
  const seed = customerId.split('-')[1] || '0';
  const startIndex = parseInt(seed) % Math.max(1, orders.length - count);
  return orders.slice(startIndex, startIndex + count);
};

export const paginateOrders = (
  orders: OrderWithId[],
  page: number,
  itemsPerPage: number
): OrderWithId[] => {
  const startIndex = 0;
  const endIndex = page * itemsPerPage;
  return orders.slice(startIndex, endIndex);
};

export const simulateLoadingDelay = (delay: number = 800): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, delay));
};
