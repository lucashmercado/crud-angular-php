import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost/api.php';

  constructor(private http: HttpClient) { }

  // Métodos existentes
  getusers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(this.apiUrl, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.apiUrl, { body: { id } });
  }

  register(usuarios: { nombre: string, contrasena: string, correo: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register.php`, usuarios);
  }

  login(usuarios: { nombre: string, contrasena: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login.php`, usuarios);
  }

  // Nuevo método para obtener un usuario por ID
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?id=${id}`);
  }
}