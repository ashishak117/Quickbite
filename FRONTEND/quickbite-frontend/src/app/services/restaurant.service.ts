// src/app/services/restaurant.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Restaurant {
  id?: number;
  name: string;
  about?: string;
  address?: string;
  email?: string;
  phone?: string;
  image?: string;
  ownerId?: number;
  approved?: boolean;
  deniedMessage?: string;
}

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  private api = `${environment.apiUrl}/restaurants`;

  constructor(private http: HttpClient) {}

  // create restaurant (ownerId must be present)
  create(payload: Partial<Restaurant>): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.api, payload);
  }

  // other helpers...
  getAll() {
    return this.http.get<Restaurant[]>(this.api);
  }

  getByOwner(ownerId: number) {
    return this.http.get<Restaurant[]>(`${this.api}?ownerId=${ownerId}`);
  }

  getById(id: number) {
    return this.http.get<Restaurant>(`${this.api}/${id}`);
  }
}
