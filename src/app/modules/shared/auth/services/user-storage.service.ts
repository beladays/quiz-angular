import { Injectable } from '@angular/core';

const USER = 'q_user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() {}

  private static isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  static saveUser(user: any): void {
    if (!this.isBrowser()) return;
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getUser(): any {
    if (!this.isBrowser()) return null;
    const user = window.localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  static getUserId(): string {
    const user = this.getUser();
    return user?.id || '';
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user?.role || '';
  }

  static isAdminLoggedIn(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  static isUserLoggedIn(): boolean {
    return this.getUserRole() === 'USER';
  }

  static signOut(): void {
    if (!this.isBrowser()) return;
    window.localStorage.removeItem(USER);
  }
}
