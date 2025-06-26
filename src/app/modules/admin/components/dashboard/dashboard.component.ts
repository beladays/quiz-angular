import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { sharedImports } from '../../../shared/auth/signup/shared/shared.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    sharedImports,
    CommonModule
  ],
  standalone: true
})
export class DashboardComponent implements OnInit {
  quizzes: any[] = [];
  loading = false;
  error = '';

  constructor(
    private adminService: AdminService,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.loading = true;
    this.error = '';

    this.adminService.getAllTests().subscribe({
      next: (res) => {
        this.quizzes = res.quizzes || res || [];  
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Erro ao carregar quizzes';
        this.loading = false;
      }
    });
  }

  openTest(id: number): void {
    this.router.navigate(['/admin/view-test', id]);
  }

  editQuiz(id: number): void {
    this.router.navigate(['/admin/edit-quiz', id]);

  }

  removeQuiz(id: number): void {
    if (confirm('Tem certeza que deseja remover esse quiz?')) {
      this.adminService.deleteQuiz(id).subscribe({
        next: () => {
          this.notification.success('Sucesso', 'Quiz removido com sucesso.');
          this.loadQuizzes();
        },
        error: () => {
          this.notification.error('Erro', 'Não foi possível remover o quiz.');
        }
      });
    }
  }
}
