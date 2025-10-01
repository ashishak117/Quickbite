/* src/app/components/navbar/navbar.component.ts */
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  cartCount = 0;
  userInitial = '';
  logoExists = false;
  private sub: Subscription;

  constructor(public auth: AuthService, private router: Router, private cart: CartService) {
    // subscribe cart count (keeps nav reactive)
    this.sub = this.cart.items$.subscribe(items => {
      this.cartCount = (items || []).reduce((s, i) => s + (i.quantity || 0), 0);
    });

    // compute user initial
    const u = this.auth.currentUser;
    this.userInitial = u && u.name ? (u.name.charAt(0).toUpperCase()) : (u && u.email ? u.email.charAt(0).toUpperCase() : 'U');

    // optionally check for logo file in assets (best-effort)
    try {
      // this check is just to toggle template (no network call)
      this.logoExists = !!(document.querySelector('link[rel="icon"], img.navbar-logo'));
    } catch (e) {
      this.logoExists = false;
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
