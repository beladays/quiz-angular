import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8000/login"; 


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  register(data: any): Observable<any> {
  return this.http.post('http://localhost:8000/registro', data, {
    headers: { 'Content-Type': 'application/json' }
  });
}
  login(loginRequest: any): Observable<any>{
    return this.http.post(BASIC_URL, loginRequest);
  }
}
