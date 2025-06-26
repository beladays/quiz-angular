import { Component } from '@angular/core';
import { sharedImports } from '../../../shared/auth/signup/shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-test',
  standalone: true,
  imports: [
    sharedImports,
    CommonModule
  ],
  templateUrl: './view-test.component.html',
  styleUrl: './view-test.component.css'
})
export class ViewTestComponent {

  questions: any[] = [];
  testId: number | null = null;

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
}
