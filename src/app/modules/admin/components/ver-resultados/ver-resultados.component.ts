import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-ver-resultados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-resultados.component.html',
  styleUrls: ['./ver-resultados.component.css']
})
export class VerResultadosComponent implements OnInit {
  resultados: Array<{
    id: number;
    user?: { nome: string };
    quiz: { titulo: string };
    score: number;
    createdAt: string;
  }> = [];

  media: number = 0; // <-- DECLARA AQUI

  loading = true;
  error = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllTestResults().subscribe({
      next: (res) => {
        this.resultados = res.resultados || [];
        this.media = res.media || 0;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar resultados.';
        this.loading = false;
      }
    });
  }
}
