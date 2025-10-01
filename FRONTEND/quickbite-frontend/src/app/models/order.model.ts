export interface Order {
  id?: number;
  restaurantId: number;
  items: { itemId: number; name: string; price: number; qty: number; veg: boolean }[];
  customerId?: number;
  totalAmount: number;
  deliveryCharge: number;
  paymentMethod: 'COD' | 'CARD';
  status?: 'PLACED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CLOSED';
  createdAt?: string;
}
