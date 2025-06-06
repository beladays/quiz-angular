import { Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { CriarQuizComponent } from './criar-quiz/criar-quiz.component';
import { QuizComponent } from './quiz/quiz.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'perfil',
        component: PerfilComponent,
      },
      {
        path: 'criar-quiz',
        component: CriarQuizComponent,
      },
      {
        path: 'quiz',
        component: QuizComponent,
      },
    ],
  },
];
