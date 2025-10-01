import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRole = route.data['role'] as string;
    const user = this.auth.currentUser;
    if (!user || (allowedRole && user.role !== allowedRole)) {
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }
}
