// src/app/models/cart-item.model.ts
import { MenuItem } from './menu-item.model';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}
