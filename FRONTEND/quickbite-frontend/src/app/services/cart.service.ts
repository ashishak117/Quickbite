// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { MenuItem } from '../models/menu-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private KEY = 'qb_cart';
  private _items$ = new BehaviorSubject<CartItem[]>(this.load());
  items$ = this._items$.asObservable();

  private load(): CartItem[] {
    const raw = localStorage.getItem(this.KEY);
    return raw ? JSON.parse(raw) : [];
  }

  private save(items: CartItem[]) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this._items$.next(items);
  }

  add(item: MenuItem, quantity = 1) {
    const items = this.load();
    const idx = items.findIndex(i => i.item.id === item.id);
    if (idx >= 0) {
      items[idx].quantity += quantity;
    } else {
      items.push({ item, quantity });
    }
    this.save(items);
  }

  // alias used by components
  updateQuantity(itemId: number, newQty: number) {
    const items = this.load().map(i => i.item.id === itemId ? { ...i, quantity: Math.max(0, newQty) } : i).filter(i => i.quantity > 0);
    this.save(items);
  }

  // keep older name also if some components call updateQty
  updateQty(itemId: number, newQty: number) {
    this.updateQuantity(itemId, newQty);
  }

  remove(itemId: number) {
    const items = this.load().filter(i => i.item.id !== itemId);
    this.save(items);
  }

  clear() {
    this.save([]);
  }

  getItems(): CartItem[] {
    return this.load();
  }

  getTotal(): number {
    return this.load().reduce((sum, it) => sum + (it.item.price * it.quantity), 0);
  }
}
