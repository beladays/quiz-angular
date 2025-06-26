import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateTestComponent } from './components/dashboard/create-test/create-test.component';
import { ViewTestComponent } from './components/view-test/view-test.component';
import { ViewTestResultsComponent } from './components/view-test-results/view-test-results.component';
import { EditQuizComponent } from './components/edit-quiz/edit-quiz.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
   {path: 'create-test', component: CreateTestComponent},
   {path: 'view-test/:id', component: ViewTestComponent},
   {path: 'view-test-results', component: ViewTestResultsComponent},
   { path: 'edit-quiz/:id', component: EditQuizComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
