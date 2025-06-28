import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  constructor(private authService:AuthService,private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Check if user is authenticated (you can modify this logic based on your needs)
    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated) {
      return true;
    } else {
      // Redirect to login page if not authenticated
      this.authService.clearAuthState();
      alert('You should login first')
      this.router.navigate(['/login']);
      return false;
    }
  }
}
