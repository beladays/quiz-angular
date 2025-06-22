import { Routes } from '@angular/router';
import { SignupComponent } from './modules/shared/auth/signup/signup.component';
import { LoginComponent } from './modules/shared/auth/login/login.component';
import { ForgetComponent } from './modules/shared/auth/forget/forget.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path:'register', component: SignupComponent},
    {path:'login', component: LoginComponent},
    {path: 'forget', component: ForgetComponent },
{
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule)
  },

  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule)
  },

  { path: '**', redirectTo: 'login' }
];