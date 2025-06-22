import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8000/dashboard'; // ajuste sua baseURL

  constructor(private http: HttpClient) {}

  // Buscar quizzes (com perguntas e respostas)
  getAllTests(): Observable<any> {
    return this.http.get(`${this.baseUrl}/quizzes`);
  }

  // Buscar perguntas e respostas de um quiz específico
  getTestQuestions(testId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/quizzes/${testId}`);
  }

  // Buscar histórico do usuário (resultados)
  getTestResults(): Observable<any> {
    return this.http.get(`${this.baseUrl}/historico`);
  }

  // Criar quiz com perguntas e respostas (se implementado no backend)
  createQuizComPerguntas(quizData: any): Observable<any> {
    // Como no seu backend você tem posts separados para quiz, questions e answers,
    // você terá que fazer chamadas separadas ou criar um endpoint que aceite o payload completo.
    // Aqui deixo só um exemplo genérico (precisa ajustar backend para aceitar este post):
    return this.http.post(`${this.baseUrl}/quizzes-completo`, quizData);
  }
}
