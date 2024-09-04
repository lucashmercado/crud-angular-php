import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/api.php'; // Cambia esta URL a la correcta

  constructor(private http: HttpClient) { }

  register(user: { nombre: string, contraseña: string, correo: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register.php`, user);
  }

  login(user: { nombre: string, contraseña: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login.php`, user);
  }
}
