import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserStorageService } from './user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private isLoggedIn = new BehaviorSubject<boolean>(!!UserStorageService.getUser());
  currentState$ = this.isLoggedIn.asObservable();

  notifyLogin(): void {
    this.isLoggedIn.next(true);
  }

  notifyLogout(): void {
    this.isLoggedIn.next(false);
  }
}
