import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { sharedImports } from '../../../shared/auth/signup/shared/shared.module';

@Component({
  selector: 'app-edit-quiz',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    sharedImports
  ],
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})
export class EditQuizComponent implements OnInit {
  quizForm!: FormGroup;
  quizId!: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.quizId = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadQuiz();
  }

  initForm(): void {
    this.quizForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['']
      // adicione outros campos que o quiz tenha
    });
  }

  loadQuiz(): void {
    this.loading = true;
    this.adminService.getTestQuestions(this.quizId).subscribe({
      next: (quiz) => {
        this.quizForm.patchValue({
          titulo: quiz.titulo,
        });
        this.loading = false;
      },
      error: () => {
        this.message.error('Erro ao carregar o quiz.');
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (this.quizForm.invalid) {
      this.message.warning('Preencha os campos obrigatórios.');
      return;
    }

    this.loading = true;
    const updatedQuiz = this.quizForm.value;

    this.adminService.updateQuiz(this.quizId, updatedQuiz).subscribe({
      next: () => {
        this.message.success('Quiz atualizado com sucesso!');
        this.router.navigate(['/admin/dashboard']);
      },
      error: () => {
        this.message.error('Erro ao atualizar o quiz.');
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
