/* src/app/services/auth.service.ts */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface AuthResponse {
  token: string;
  userId: number;
  email: string;
  role: string;
  // backend may not return name — we'll preserve name from registration payload
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = `${environment.apiUrl}/auth`;
  private tokenKey = 'qb_token';
  private userKey = 'qb_user';

  private _isLoggedIn$ = new BehaviorSubject<boolean>(!!this.getToken());
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient) {}

  get isLoggedIn(): boolean { return !!this.getToken(); }

  // returns whatever is stored under qb_user (may include name, id, email, role)
  get currentUser(): any | null {
    const raw = localStorage.getItem(this.userKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  login(payloadOrEmail: any, maybePassword?: string): Observable<AuthResponse> {
    const body = (typeof payloadOrEmail === 'object') ? payloadOrEmail : { email: payloadOrEmail, password: maybePassword };
    return this.http.post<AuthResponse>(`${this.api}/login`, body)
      .pipe(tap(res => this.handleAuthSuccess(res)));
  }

  // register: keep payload so we can save name locally (backend may not return it)
  register(payload: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/register`, payload)
      .pipe(tap(res => {
        this.handleAuthSuccess(res);
        // store name if provided in payload
        if (payload?.name) {
          const raw = localStorage.getItem(this.userKey);
          const parsed = raw ? JSON.parse(raw) : {};
          parsed.name = payload.name;
          localStorage.setItem(this.userKey, JSON.stringify(parsed));
        }
      }));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this._isLoggedIn$.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private handleAuthSuccess(res: AuthResponse) {
    if (!res || !res.token) return;
    const user = { id: res.userId, email: res.email, role: res.role };
    localStorage.setItem(this.tokenKey, res.token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this._isLoggedIn$.next(true);
  }
}
