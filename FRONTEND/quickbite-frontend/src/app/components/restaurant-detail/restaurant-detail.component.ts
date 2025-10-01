// // src/app/components/restaurant-detail/restaurant-detail.component.ts
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute } from '@angular/router';
// import { Restaurant } from '../../models/restaurant.model';
// import { MenuItem } from '../../models/menu-item.model';
// import { RestaurantService } from '../../services/restaurant.service';
// import { MenuService } from '../../services/menu.service';
// import { CartService } from '../../services/cart.service';
// import { AuthService } from '../../services/auth.service';


// @Component({
//   selector: 'app-restaurant-detail',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './restaurant-detail.component.html',

// })
// export class RestaurantDetailComponent implements OnInit {
//   restaurant?: Restaurant;
//   menu: MenuItem[] = [];
//   filter: 'ALL'|'VEG'|'NONVEG' = 'ALL';

//   constructor(
//     private route: ActivatedRoute,
//     private restSvc: RestaurantService,
//     private menuSvc: MenuService,
//     private cart: CartService,
//     private auth: AuthService
//   ) {}

//   ngOnInit() {
//     const id = +this.route.snapshot.paramMap.get('id')!;
//     this.restSvc.getById(id).subscribe(r => this.restaurant = r);
//     this.loadMenu(id);
//   }

//   loadMenu(id: number) {
//     this.menuSvc.listByRestaurant(id).subscribe(m => this.menu = m);
//   }

//   addToCart(item: MenuItem) {
//     this.cart.add(item, 1);
//     alert('Added to cart');
//   }

//   visibleItems() {
//     if (this.filter === 'ALL') return this.menu;
//     if (this.filter === 'VEG') return this.menu.filter(m => m.veg);
//     return this.menu.filter(m => !m.veg);
//   }
// }
// src/app/components/restaurant-detail/restaurant-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../../models/restaurant.model';
import { MenuItem } from '../../models/menu-item.model';
import { RestaurantService } from '../../services/restaurant.service';
import { MenuService } from '../../services/menu.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-detail.component.html',
})
export class RestaurantDetailComponent implements OnInit {
  restaurant?: Restaurant;
  menu: MenuItem[] = [];
  filter: 'ALL'|'VEG'|'NONVEG' = 'ALL';

  constructor(
    private route: ActivatedRoute,
    private restSvc: RestaurantService,
    private menuSvc: MenuService,
    private cart: CartService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.restSvc.getById(id).subscribe(r => this.restaurant = r);
    this.loadMenu(id);
  }

  loadMenu(id: number) {
    this.menuSvc.listByRestaurant(id).subscribe(m => this.menu = m || []);
  }

  addToCart(item: MenuItem) {
    this.cart.add(item, 1);
    alert('Added to cart');
  }

  visibleItems() {
    if (this.filter === 'ALL') return this.menu;
    if (this.filter === 'VEG') return this.menu.filter(m => m.veg);
    return this.menu.filter(m => !m.veg);
  }

  imageUrl(path?: string) {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/uploads')) return `${environment.serverUrl}${path}`;
    return `${environment.apiUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  }
}
