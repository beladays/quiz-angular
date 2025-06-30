import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { sharedImports } from '../../../shared/auth/signup/shared/shared.module';
import { AdminService } from '../../services/admin.service';
import { EditQuizComponent } from '../edit-quiz/edit-quiz.component';

@Component({
  selector: 'app-view-test',
  standalone: true,
  imports: [
    sharedImports,
    CommonModule,
    EditQuizComponent
  ],
  templateUrl: './view-test.component.html',
  styleUrls: ['./view-test.component.css'] 
})
export class ViewTestComponent {

  questions: any[] = [];
  testId: number | null = null;
  editingQuestionId: number | null = null;

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.testId = +idParam;

        this.adminService.getTestQuestions(this.testId).subscribe({
          next: (res) => {
            this.questions = res.quiz?.questions || [];
            console.log(this.questions);
          },
          error: (err) => {
            console.error('Erro ao carregar perguntas:', err);
          }
        });
      }
    });
  }
  

  startEditing(questionId: number) {
    this.editingQuestionId = questionId;
  }

  atualizarPergunta(perguntaAtualizada: any) {
      console.log('atualizarPergunta chamado com:', perguntaAtualizada);
  this.adminService.updateQuestion(perguntaAtualizada).subscribe({
    next: (perguntaAtualizadaDoBackend) => {
      console.log('Pergunta atualizada com sucesso');
      this.editingQuestionId = null;

      const index = this.questions.findIndex(q => q.id === perguntaAtualizadaDoBackend.id);
      if (index !== -1) {
        this.questions[index] = perguntaAtualizadaDoBackend;
      }
    },
    error: (err) => {
      console.error('Erro ao atualizar pergunta:', err);
    }
  });
}
}