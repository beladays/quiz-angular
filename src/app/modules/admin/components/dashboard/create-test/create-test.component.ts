import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../../services/admin.service';
import { sharedImports } from '../../../../shared/auth/signup/shared/shared.module';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css'],
  standalone: true,
  imports: [sharedImports]
})
export class CreateTestComponent {
  quizForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizForm = this.fb.group({
      titulo: ['', Validators.required],
      perguntas: this.fb.array([this.createQuestion()])
    });
  }

  get perguntas(): FormArray {
    return this.quizForm.get('perguntas') as FormArray;
  }

  getPerguntas(): FormGroup[] {
    return this.perguntas.controls as FormGroup[];
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      texto: ['', Validators.required],
      opcoes: this.fb.array([
        this.createOption(),
        this.createOption(),
        this.createOption(),
        this.createOption()
      ]),
      correta: ['', Validators.required]
    });
  }

  getOpcoes(perguntaIndex: number): FormGroup[] {
    const opcoes = this.perguntas.at(perguntaIndex).get('opcoes') as FormArray;
    return opcoes.controls as FormGroup[];
  }

  createOption(): FormGroup {
    return this.fb.group({
      texto: ['', Validators.required]
    });
  }

  addQuestion(): void {
    this.perguntas.push(this.createQuestion());
  }

  removeQuestion(index: number): void {
    this.perguntas.removeAt(index);
  }

submitForm(): void {
  if (this.quizForm.valid) {
    const formValue = this.quizForm.value;

    const perguntasTransformadas = formValue.perguntas.map((p: any) => {
      return {
        texto: p.texto,
        opcoes: p.opcoes.map((opcao: any, index: number) => ({
          texto: opcao.texto,
          correta: index === p.correta // marca a correta
        }))
      };
    });

    const payload = {
      titulo: formValue.titulo,
      perguntas: perguntasTransformadas
    };

    this.adminService.createQuiz(payload).subscribe({
      next: () => {
        this.notification.success('Sucesso', 'Quiz criado com sucesso');
        this.router.navigateByUrl('/admin/dashboard');
      },
      error: (err) => {
        this.notification.error('Erro', err.message || 'Erro ao criar quiz');
      }
    });
  } else {
    this.notification.error('Erro', 'Formulário inválido. Preencha todos os campos.');
  }
}
}