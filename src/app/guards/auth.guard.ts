import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserStorageService } from '../modules/shared/auth/services/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private message: NzMessageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = UserStorageService.getUser();

    if (user && user.token) {
      return true; // Libera acesso
    }

    this.message.warning('Você precisa estar logado para acessar essa página.');
    
    return false; 
  }
}
