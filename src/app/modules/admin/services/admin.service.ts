// admin.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../shared/auth/services/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8000'; 

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = UserStorageService.getUser()?.token;
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Pega todos os quizes (admin)
  getAllTests(): Observable<any> {
    return this.http.get(`${this.baseUrl}/quizzes`, {
      headers: this.getHeaders()
    });
  }

  // Pega um quiz só (admin)
  getTestQuestions(testId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/quizzes/${testId}`, {
      headers: this.getHeaders()
    });
  }

  // Buscar histórico (admin OU usuário - o backend decide)
  getTestResults(): Observable<any> {
    return this.http.get(`${this.baseUrl}/historico`, {
      headers: this.getHeaders()
    });
  }

  getAllTestResults(): Observable<any> {
  return this.http.get(`${this.baseUrl}/historico/admin`, {
    headers: this.getHeaders()
  });
}

  // Criar novo quiz
  createQuiz(quizData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/quizzes`, quizData, {
      headers: this.getHeaders()
    });
  }

  // Criar pergunta
  createQuestion(questionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/questions`, questionData, {
      headers: this.getHeaders()
    });
  }

  // Criar resposta
  createAnswer(answerData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/answers`, answerData, {
      headers: this.getHeaders()
    });
  }

  // Excluir quiz
  deleteQuiz(quizId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/quizzes/${quizId}`, {
      headers: this.getHeaders()
    });
  }

  // Atualizar pergunta
  updateQuestion(questionData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/questions/${questionData.id}`, questionData, {
      headers: this.getHeaders()
    });
  }
}
