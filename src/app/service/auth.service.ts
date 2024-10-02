import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private apiUrl = 'http://localhost'; // Base URL for your API

  constructor(private http: HttpClient) { }

  register(usuarios: { nombre: string, contrasena: string, correo: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register.php`, usuarios);
  }

  login(user: { nombre: string, contrasena: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login.php`, user);
  }
}
