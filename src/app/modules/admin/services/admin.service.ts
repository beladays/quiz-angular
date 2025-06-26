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

  // Busca todos os quizzes 
  getAllTests(): Observable<any> {
    return this.http.get(`${this.baseUrl}/quizzes`, {
      headers: this.getHeaders()
    });
  }

  // Busca um quiz específico 
  getTestQuestions(testId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/quizzes/${testId}`, {
      headers: this.getHeaders()
    });
  }

  // Buscar histórico de respostas dos usuários
  getTestResults(): Observable<any> {
    return this.http.get(`${this.baseUrl}/historico`, {
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

  // Atualizar quiz existente
  updateQuiz(id: number, quizData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/quizzes/${id}`, quizData, {
      headers: this.getHeaders()
    });
  }
}
