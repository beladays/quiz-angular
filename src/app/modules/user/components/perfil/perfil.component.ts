import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table'; 
import { NzAvatarModule } from 'ng-zorro-antd/avatar'; 
import { NzTypographyModule } from 'ng-zorro-antd/typography'; 

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzAvatarModule,
    NzTypographyModule
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  user = {
    name: 'João Silva',
    email: 'joao@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=3' // exemplo img
  };

  quizStats = [
    { testName: 'Quiz de Matemática', totalQuestions: 10, correctAnswers: 8, percentage: 80 },
    { testName: 'Quiz de História', totalQuestions: 15, correctAnswers: 12, percentage: 80 }
  ];
}
