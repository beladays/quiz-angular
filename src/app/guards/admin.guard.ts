
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserStorageService } from '../modules/shared/auth/services/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = UserStorageService.getUser();
    if (user && user.token && user.role === 'ADMIN') {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
