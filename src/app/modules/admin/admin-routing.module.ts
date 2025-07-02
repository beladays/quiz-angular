import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateTestComponent } from './components/dashboard/create-test/create-test.component';
import { ViewTestComponent } from './components/view-test/view-test.component';
import { EditQuizComponent } from './components/edit-quiz/edit-quiz.component';
import { VerResultadosComponent} from './components/ver-resultados/ver-resultados.component';
import { AdminGuard } from '../../guards/admin.guard';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard],},
   {path: 'create-test', component: CreateTestComponent, canActivate: [AdminGuard],},
   {path: 'view-test/:id', component: ViewTestComponent, canActivate: [AdminGuard],},
   { path: 'edit-quiz/:id', component: EditQuizComponent, canActivate: [AdminGuard],},
     { path: 'ver-resultados', component: VerResultadosComponent, canActivate: [AdminGuard],},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
