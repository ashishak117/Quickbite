// src/app/models/menu-item.model.ts
export interface MenuItem {
  id?: number;
  restaurantId: number; // required now to match components
  name: string;
  price: number;
  veg: boolean;
  image?: string;
  published?: boolean;
}
