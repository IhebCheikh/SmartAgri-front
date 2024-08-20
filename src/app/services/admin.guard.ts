import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      if (tokenPayload.role === 'admin') {
        return true;
      }
    }
    this.router.navigate(['/login']); // Redirect to login if not an admin
    return false;
  }
}
