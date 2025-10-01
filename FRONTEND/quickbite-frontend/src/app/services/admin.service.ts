
// // src/app/services/admin.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';
// import { Observable, of, tap, catchError } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class AdminService {
//   private api = `${environment.apiUrl}/admin`;

//   constructor(private http: HttpClient) {}

//   getPending(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.api}/pending-restaurants`)
//       .pipe(
//         tap(res => console.log('AdminService.getPending response', res)),
//         catchError(err => {
//           console.error('AdminService.getPending error', err);
//           // return empty array so UI doesn't crash
//           return of([]);
//         })
//       );
//   }

//   approve(id: number): Observable<any> {
//     return this.http.post(`${this.api}/restaurants/${id}/approve`, {})
//       .pipe(tap(() => console.log('approved', id)));
//   }

//   deny(id: number, message: string): Observable<any> {
//     return this.http.post(`${this.api}/restaurants/${id}/deny`, message || 'Denied');
//   }

//   // kept original name too
//   pendingRestaurants(): Observable<any[]> {
//     return this.getPending();
//   }
// }
// src/app/services/admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of, tap, catchError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private api = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  getPending(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/pending-restaurants`)
      .pipe(
        tap(res => console.log('AdminService.getPending response', res)),
        catchError(err => {
          console.error('AdminService.getPending error', err);
          return of([]);
        })
      );
  }

  approve(id: number): Observable<any> {
    return this.http.post(`${this.api}/restaurants/${id}/approve`, {})
      .pipe(tap(() => console.log('approved', id)));
  }

  deny(id: number, message: string): Observable<any> {
    return this.http.post(`${this.api}/restaurants/${id}/deny`, message || 'Denied');
  }

  pendingRestaurants(): Observable<any[]> {
    return this.getPending();
  }

  // new
  getStats(): Observable<any> {
    return this.http.get<any>(`${this.api}/stats`);
  }
}
