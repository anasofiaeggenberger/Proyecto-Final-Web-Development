import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuth = localStorage.getItem('auth');
    if (isAuth === 'true') {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}