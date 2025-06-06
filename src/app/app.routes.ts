import { Routes } from '@angular/router';
import { CriarQuizComponent } from './criar-quiz/criar-quiz.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { QuizComponent } from './quiz/quiz.component';
import path from 'path';
import { CadastroComponent } from './cadastro/cadastro.component';
import { EsqueceuSenhaComponent } from './esqueceu-senha/esqueceu-senha.component';

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

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  },

  {
    path: 'esqueceu-senha',
    component: EsqueceuSenhaComponent
  }

];
