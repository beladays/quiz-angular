import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../shared/auth/services/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private baseUrl = 'http://localhost:8000'; // backend

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = UserStorageService.getUser()?.token;
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    return new HttpHeaders();
  }

  // Buscar quiz público por id (envia token)
  getPublicTestQuestions(id: number): Observable<any> {
    return this.http.get<{ quiz: any }>(`${this.baseUrl}/quizzes-public/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Buscar todos quizzes públicos (envia token)
  getAllTest(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/quizzes-publico`, {
      headers: this.getHeaders()
    });
  }

  // **Não usar essa rota para usuário normal, pois requer admin**
  // Se quiser remover para evitar confusão:
  // getTestQuestions(id: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/quizzes/${id}`, {
  //     headers: this.getHeaders()
  //   });
  // }

  submitTest(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/responder-quiz`, data, {
      headers: this.getHeaders()
    });
  }

  getMyTestResults(): Observable<any> {
    return this.http.get(`${this.baseUrl}/historico`, {
      headers: this.getHeaders()
    });
  }
}
