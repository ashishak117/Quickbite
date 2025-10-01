// src/app/components/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  deliveryCharge = 30;

  constructor(private cart: CartService, private router: Router) {}

  ngOnInit() {
    this.items = this.cart.getItems();
    this.cart.items$.subscribe(it => this.items = it);
  }

  increase(it: CartItem) {
    this.cart.updateQuantity(it.item.id!, it.quantity + 1);
  }
  decrease(it: CartItem) {
    this.cart.updateQuantity(it.item.id!, it.quantity - 1);
  }

  get subtotal() {
    return this.items.reduce((s, i) => s + i.item.price * i.quantity, 0);
  }

  goToPayment() {
    localStorage.setItem('qb_cart_summary', JSON.stringify({
      subtotal: this.subtotal,
      delivery: this.deliveryCharge,
      total: this.subtotal + this.deliveryCharge
    }));
    this.router.navigate(['/payment']);
  }
}
