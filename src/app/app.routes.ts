import { Routes } from '@angular/router';
import { SignupComponent } from './modules/shared/auth/signup/signup.component';
import { LoginComponent } from './modules/shared/auth/login/login.component';
import { ForgetComponent } from './modules/shared/auth/forget/forget.component';

export const routes: Routes = [
    {path:'register', component: SignupComponent},
    {path:'login', component: LoginComponent},
    {path: 'forget', component: ForgetComponent },
    {path:'user', loadChildren: ()=> import('./modules/user/user.module').then(m => m.UserModule)},
    {path:'admin', loadChildren: ()=> import('./modules/admin/admin.module').then(m => m.AdminModule)},

];
