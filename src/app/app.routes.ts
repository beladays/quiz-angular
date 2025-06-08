import { Routes } from '@angular/router';
import { SignupComponent } from './modules/shared/auth/signup/signup.component';
import { LoginComponent } from './modules/shared/auth/login/login.component';
export const routes: Routes = [
    {path:'register', component: SignupComponent},
    {path:'login', component: LoginComponent}
];
