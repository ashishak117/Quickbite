
// // src/app/app.module.ts
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { TokenInterceptor } from './interceptors/token.interceptor';

// @NgModule({
//   imports: [
//     BrowserModule,
//     HttpClientModule,
//     AppRoutingModule,
//     AppComponent // bootstrap standalone root component via imports
//   ],
//   providers: [
//     { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

/* src/app/app.module.ts */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// components (standalone)
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
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

import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    // standalone components
    AppComponent,
    NavbarComponent,
    AuthComponent,
    CustomerHomeComponent,
    RestaurantDetailComponent,
    CartComponent,
    PaymentComponent,
    OrderStatusComponent,
    OwnerHomeComponent,
    RestaurantRegisterComponent,
    MenuManagerComponent,
    OwnerOrdersComponent,
    OwnerAnalyticsComponent,
    AdminApprovalComponent,
    AdminDashboardComponent,
    NotFoundComponent,
    ProfileComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
