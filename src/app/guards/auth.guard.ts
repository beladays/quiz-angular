import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserStorageService } from '../modules/shared/auth/services/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private message: NzMessageService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = UserStorageService.getUser();

    if (user && user.token) {
      return true; 
    }

    this.message.warning('Você precisa estar logado para acessar essa página.');
    this.router.navigate(['/login']);
    return false; 
  }
}
