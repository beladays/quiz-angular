import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TestService } from '../../services/test.service';
import { UserStorageService } from '../../../shared/auth/services/user-storage.service';
import { sharedImports } from '../../../shared/auth/signup/shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-take-test',
  standalone: true,
 
   imports: [sharedImports, 
    ],
  templateUrl: './take-test.component.html',
  styleUrl: './take-test.component.css'
  
})
export class TakeTestComponent {
  quizId!: number;
  quiz: any;
  answers: { [key: number]: number } = {};

  constructor(private route: ActivatedRoute, private testService: TestService) {}

 ngOnInit(): void {
  this.quizId = +this.route.snapshot.paramMap.get('id')!;
  this.loadQuiz();
}

loadQuiz(): void {
  this.testService.getPublicTestQuestions(this.quizId).subscribe({
    next: (res) => {
      this.quiz = res.quiz; // pois rota pública retorna { quiz: ... }
    },
    error: (err) => {
      console.error('Erro ao carregar quiz', err);
    }
  });
}

  selecionarResposta(questionId: number, answerId: number): void {
    this.answers[questionId] = answerId;
  }

resultado: { total: number; acertos: number; erros: number; score: string } | null = null;

enviar(): void {
  const respostasFormatadas = Object.entries(this.answers).map(([questionId, answerId]) => ({
    question_id: Number(questionId),
    answer_id: answerId
  }));

  const payload = {
    quiz_id: this.quizId,
    respostas: respostasFormatadas
  };

  this.testService.submitTest(payload).subscribe({
    next: (res) => {
      this.resultado = res.resultado; // Salva o resultado pra mostrar na tela
    },
    error: (err) => {
      console.error('Erro ao enviar respostas', err);
      alert('Erro ao enviar respostas. Tente novamente.');
    }
  });
}}
