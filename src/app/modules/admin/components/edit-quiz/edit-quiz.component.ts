import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { sharedImports } from '../../../shared/auth/signup/shared/shared.module';

@Component({
  selector: 'app-edit-quiz',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    sharedImports,
    FormsModule
  ],
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})
export class EditQuizComponent {
  @Input() question: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  updateQuestion() {
      console.log('Salvar Alterações clicado:', this.question);
    this.save.emit(this.question);
  }
  

  marcarComoCorreta(respostaId: number) {
    this.question.answers.forEach(resposta => {
      resposta.correta = resposta.id === respostaId;
    });
  }
}
