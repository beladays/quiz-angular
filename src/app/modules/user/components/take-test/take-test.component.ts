import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from '../../services/test.service';
import { sharedImports } from '../../../shared/auth/signup/shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-take-test',
   standalone: true,
 
   imports: [
    sharedImports,
    CommonModule,
    ],
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.css'],
})
export class TakeTestComponent implements OnInit {
  quizId!: number;
  quiz: any;
  answers: { [key: number]: number } = {};
  resultado: { total: number; acertos: number; erros: number; score: number } | null = null;

  constructor(private route: ActivatedRoute, private testService: TestService) {}

  ngOnInit(): void {
    this.quizId = +this.route.snapshot.paramMap.get('id')!;
    this.loadQuiz();
  }

  loadQuiz(): void {
    this.testService.getPublicTestQuestions(this.quizId).subscribe({
      next: (res) => {
        this.quiz = res.quiz;
      },
      error: (err) => {
        console.error('Erro ao carregar quiz', err);
      }
    });
  }

  selecionarResposta(questionId: number, answerId: number): void {
    this.answers[questionId] = answerId;
  }

  enviar(): void {
    // Verifica se todas perguntas estão respondidas
    if (Object.keys(this.answers).length !== this.quiz.questions.length) {
      alert('Por favor, responda todas as perguntas antes de enviar.');
      return;
    }

    const respostasFormatadas = Object.entries(this.answers).map(([questionId, answerId]) => ({
      question_id: Number(questionId),
      answer_id: answerId
    }));

    const payload = {
      quiz_id: this.quizId,
      respostas: respostasFormatadas
    };
//mostra resultado logo dps q conclui o quiz
    this.testService.submitTest(payload).subscribe({
      next: (res) => {
        this.resultado = res.resultado; 
        setTimeout(() => {
          document.querySelector('.resultado')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      },
      error: (err) => {
        console.error('Erro ao enviar respostas', err);
        alert('Erro ao enviar respostas. Tente novamente.');
      }
    });
  }
}
