// // src/app/app-routing.module.ts
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AuthComponent } from './components/auth/auth.component';
// import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
// import { RestaurantDetailComponent } from './components/restaurant-detail/restaurant-detail.component';
// import { CartComponent } from './components/cart/cart.component';
// import { PaymentComponent } from './components/payment/payment.component';
// import { OrderStatusComponent } from './components/order-status/order-status.component';
// import { OwnerHomeComponent } from './components/owner-home/owner-home.component';
// import { RestaurantRegisterComponent } from './components/restaurant-register/restaurant-register.component';
// import { MenuManagerComponent } from './components/menu-manager/menu-manager.component';
// import { OwnerOrdersComponent } from './components/owner-orders/owner-orders.component';
// import { OwnerAnalyticsComponent } from './components/owner-analytics/owner-analytics.component';
// import { AdminApprovalComponent } from './components/admin-approval/admin-approval.component';
// import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
// import { NotFoundComponent } from './components/not-found/not-found.component';
// import { ProfileComponent } from './components/profile/profile.component';

// const routes: Routes = [
//   { path: '', component: CustomerHomeComponent },
//   { path: 'auth', component: AuthComponent },

//   // customer
//   { path: 'restaurant/:id', component: RestaurantDetailComponent },
//   { path: 'cart', component: CartComponent },
//   { path: 'payment', component: PaymentComponent },
//   { path: 'orders', component: OrderStatusComponent },

//   // owner
//   { path: 'owner/home', component: OwnerHomeComponent },
//   { path: 'owner/register-restaurant', component: RestaurantRegisterComponent },
//   { path: 'owner/menu/:restaurantId', component: MenuManagerComponent },
//   { path: 'owner/orders', component: OwnerOrdersComponent },
//   { path: 'owner/analytics', component: OwnerAnalyticsComponent },

//   // admin
//   { path: 'admin/approvals', component: AdminApprovalComponent },
//   { path: 'admin/dashboard', component: AdminDashboardComponent },

//   { path: '**', component: NotFoundComponent },

//   { path: 'profile', component: ProfileComponent }

// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { RestaurantDetailComponent } from './components/restaurant-detail/restaurant-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { OwnerHomeComponent } from './components/owner-home/owner-home.component';
import { RestaurantRegisterComponent } from './components/restaurant-register/restaurant-register.component';
import { MenuManagerComponent } from './components/menu-manager/menu-manager.component';
import { OwnerOrdersComponent } from './components/owner-orders/owner-orders.component';
import { OwnerAnalyticsComponent } from './components/owner-analytics/owner-analytics.component';
import { AdminApprovalComponent } from './components/admin-approval/admin-approval.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', component: CustomerHomeComponent },
  { path: 'auth', component: AuthComponent },

  // customer
  { path: 'restaurant/:id', component: RestaurantDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'orders', component: OrderStatusComponent },

  // owner
  { path: 'owner/home', component: OwnerHomeComponent },
  { path: 'owner/register-restaurant', component: RestaurantRegisterComponent },
  { path: 'owner/menu/:restaurantId', component: MenuManagerComponent },
  { path: 'owner/orders', component: OwnerOrdersComponent },
  { path: 'owner/analytics', component: OwnerAnalyticsComponent },

  // admin
  { path: 'admin/approvals', component: AdminApprovalComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },

  { path: 'profile', component: ProfileComponent },

  // wildcard (always last)
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
