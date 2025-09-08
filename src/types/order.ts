// Types for orders
export type OrderId = `order-${number}`;
export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
export type UnixTimestamp = number;

export interface Order {
  number: number;
  'price ': number;
  currency: Currency;
  itemName: string;
  amount: number;
  createdAt: UnixTimestamp; // Unix timestamp
  shippedAt: UnixTimestamp; // Unix timestamp
}

export interface OrderWithId extends Order {
  id: OrderId;
  formattedCreatedAt: string;
  formattedShippedAt: string;
  formattedPrice: string;
}

export interface OrderListState {
  orders: OrderWithId[];
  loading: boolean;
  error: string | null;
}
