
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserStorageService } from '../modules/shared/auth/services/user-storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router,
    private message: NzMessageService
    ) {}

  canActivate(): boolean {
    const user = UserStorageService.getUser();
    if (user && user.token && user.role === 'ADMIN') {
      return true;
    }
     this.message.warning('Você não tem permissão para acessar essa página!');
    this.router.navigate(['/login']);
    return false;
  }
}
