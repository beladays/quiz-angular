import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { Router } from '@angular/router';
import { sharedImports } from '../../../shared/auth/signup/shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [sharedImports, CommonModule]
})
export class DashboardComponent implements OnInit {
  tests: any[] = [];
  loading = false;
  error = '';

  constructor(private testService: TestService, private router: Router) {}

  ngOnInit(): void {
    this.fetchTests();
  }

fetchTests(): void {
  this.loading = true;
  this.testService.getAllTest().subscribe({
    next: (res) => {
      this.tests = Array.isArray(res) ? res : [];
      this.loading = false;
    },
    error: (err) => {
      this.error = 'Erro ao carregar quizzes.';
      this.loading = false;
    }
  });
}

  takeTest(id: number): void {
    this.router.navigate(['/user/take-test', id]);
  }
}
