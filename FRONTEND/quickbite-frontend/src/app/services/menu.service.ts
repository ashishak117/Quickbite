// src/app/services/menu.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu-item.model';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private base = `${environment.apiUrl}/restaurants`;

  constructor(private http: HttpClient) {}

  // normal usage: listByRestaurant(restaurantId, published?)
  listByRestaurant(restaurantId: number, published = true): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.base}/${restaurantId}/menu?published=${published}`);
  }

  // create(restaurantId, dto) or create(payload) where payload.restaurantId exists
  create(restaurantIdOrPayload: number | any, maybeDto?: any): Observable<MenuItem> {
    if (typeof restaurantIdOrPayload === 'number') {
      return this.http.post<MenuItem>(`${this.base}/${restaurantIdOrPayload}/menu`, maybeDto);
    } else {
      const payload = restaurantIdOrPayload;
      const restId = payload.restaurantId;
      return this.http.post<MenuItem>(`${this.base}/${restId}/menu`, payload);
    }
  }

  // update(restaurantId, id, dto) or update(payload) where payload contains restaurantId & id
  update(arg1: number | any, arg2?: number | any, arg3?: any): Observable<MenuItem> {
    if (typeof arg1 === 'number' && typeof arg2 === 'number') {
      return this.http.put<MenuItem>(`${this.base}/${arg1}/menu/${arg2}`, arg3);
    } else {
      const payload = arg1;
      return this.http.put<MenuItem>(`${this.base}/${payload.restaurantId}/menu/${payload.id}`, payload);
    }
  }

  // delete(restId, id) or delete(id) if payload endpoint exists. Components call delete(id) often.
  // We'll support delete(id) by calling a backend endpoint /menu/{id} if you have it; otherwise call with restaurantId if caller passes it.
  delete(arg1: number, arg2?: number): Observable<any> {
    if (arg2 === undefined) {
      // assume backend exposes /api/menu/{id}
      return this.http.delete(`${environment.apiUrl}/menu/${arg1}`);
    } else {
      return this.http.delete(`${this.base}/${arg1}/menu/${arg2}`);
    }
  }
}
