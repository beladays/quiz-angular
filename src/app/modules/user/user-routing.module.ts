import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TakeTestComponent } from './components/take-test/take-test.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'take-test/:id', component: TakeTestComponent},
  {path: 'perfil', component: PerfilComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
