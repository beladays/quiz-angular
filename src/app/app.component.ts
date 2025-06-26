import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UserStorageService } from './modules/shared/auth/services/user-storage.service';
import { AuthStateService } from './modules/shared/auth/services/auth-state.service';
import { DemoNgZorroAntdModules } from './DemoNgZorroAntdModules';
import { sharedImports } from './modules/shared/auth/signup/shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    sharedImports,
    DemoNgZorroAntdModules
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isUserLoggedIn = false;
  isAdminLoggedIn = false;
  isCheckingAuth = true;

  constructor(
    private authStateService: AuthStateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authStateService.loggedIn$.subscribe(() => {
      this.updateLoginFlags();
    });

    this.updateLoginFlags(); //verifica 1
  }

  updateLoginFlags() {
    this.isUserLoggedIn = UserStorageService.isUserLoggedIn();
    this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    this.isCheckingAuth = false; // nav
  }

  logout() {
    UserStorageService.signOut();
    this.authStateService.setLoggedIn(false);
    this.router.navigateByUrl('/login');
  }
}
