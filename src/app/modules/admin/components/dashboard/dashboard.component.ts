import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { sharedImports } from '../../../shared/auth/signup/shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
    imports: [
      sharedImports,
      CommonModule

    ]
  
})
export class DashboardComponent implements OnInit {
  quizzes: any[] = [];
  loading = false;
  error = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.loading = true;
    this.error = '';

    this.adminService.getAllTests().subscribe({
      next: (res) => {
        // seu backend responde com { quizzes: [...] }
        this.quizzes = res.quizzes || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Erro ao carregar quizzes';
        this.loading = false;
      }
    });
  }
}
