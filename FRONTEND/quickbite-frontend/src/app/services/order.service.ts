// // src/app/services/order.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';
// import { Observable, forkJoin, of, map } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class OrderService {
//   private api = `${environment.apiUrl}/orders`;

//   constructor(private http: HttpClient) {}

//   placeOrder(dto: any) {
//     return this.http.post(this.api, dto);
//   }

//   listByCustomer(customerId: number): Observable<any[]> {
//     return this.http.get<any[]>(`${this.api}/customer/${customerId}`);
//   }

//   listForCustomer(customerId: number | null | undefined): Observable<any[]> {
//     if (!customerId) return of([]); // return empty if not logged in
//     return this.listByCustomer(customerId);
//   }

//   listByRestaurant(restId: number): Observable<any[]> {
//     return this.http.get<any[]>(`${this.api}/restaurant/${restId}`);
//   }

//   // NEW: support passing array of restaurantIds -> returns flattened list of orders
//   listForOwner(ownerArg: number | number[]): Observable<any[]> {
//     if (!ownerArg) return of([]);
//     if (Array.isArray(ownerArg)) {
//       const ids = ownerArg.filter(id => !!id);
//       if (ids.length === 0) return of([]);
//       const calls = ids.map(id => this.listByRestaurant(id));
//       return forkJoin(calls).pipe(map(arrays => arrays.flat()));
//     } else {
//       return this.listByRestaurant(ownerArg);
//     }
//   }

//   updateStatus(orderId: number, status: string) {
//     return this.http.put(`${this.api}/${orderId}/status?status=${encodeURIComponent(status)}`, {});
//   }
// }
// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, forkJoin, of, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private api = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  placeOrder(dto: any) {
    return this.http.post(this.api, dto);
  }

  listByCustomer(customerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/customer/${customerId}`);
  }

  listForCustomer(customerId: number | null | undefined): Observable<any[]> {
    if (!customerId) return of([]); // return empty if not logged in
    return this.listByCustomer(customerId);
  }

  listByRestaurant(restId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/restaurant/${restId}`);
  }

  // Updated: if ownerArg is a number (ownerId) call the server-side owner endpoint.
  listForOwner(ownerArg: number | number[]): Observable<any[]> {
    if (!ownerArg) return of([]);
    if (Array.isArray(ownerArg)) {
      const ids = ownerArg.filter(id => !!id);
      if (ids.length === 0) return of([]);
      const calls = ids.map(id => this.listByRestaurant(id));
      return forkJoin(calls).pipe(map(arrays => arrays.flat()));
    } else {
      // call backend owner endpoint that returns orders for all restaurants of that owner
      return this.http.get<any[]>(`${this.api}/owner/${ownerArg}`);
    }
  }

  updateStatus(orderId: number, status: string) {
    return this.http.put(`${this.api}/${orderId}/status?status=${encodeURIComponent(status)}`, {});
  }
}
