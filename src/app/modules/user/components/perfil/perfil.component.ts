import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTypographyModule } from 'ng-zorro-antd/typography'; 
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { TestService } from '../../services/test.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzAvatarModule,
    NzTypographyModule,
    NzNotificationModule
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user = { name: '', email: '' };
  quizStats: any[] = [];

  constructor(
    private testService: TestService,
     private notification: NzNotificationService, 
     private router: Router ) {}

  ngOnInit() {
    this.loadUser();
    this.loadHistory();
  }
    voltar() {
    this.router.navigate(['user/dashboard']); 
  }
  loadUser() {
    this.testService.getUserProfile().subscribe({
      next: (res) => {
        this.user.name = res.usuario.nome || 'Usuário';
        this.user.email = res.usuario.email || '';
      },
      error: () => {
        this.user.name = 'Usuário';
        this.user.email = '';
      }
    });
  }

  loadHistory() {
  this.testService.getMyTestResults().subscribe({
  next: (res: any) => {
    this.quizStats = res.historico.map((item: any) => ({
      testName: item.quiz.titulo,
      totalQuestions: item.quiz.questions ? item.quiz.questions.length : 0,
      correctAnswers: Math.round((item.score / 100) * (item.quiz.questions ? item.quiz.questions.length : 0)),
      percentage: typeof item.score === 'number' ? item.score.toFixed(1) : item.score
    }));
  },
  error: () => {
    this.notification.error('Erro', 'Não foi possível carregar o histórico');
  }
});
  }}
