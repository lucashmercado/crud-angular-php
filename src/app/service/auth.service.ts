import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost'; // Base URL for your API

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  // Método para registrar un nuevo usuario
  register(usuarios: { nombre: string, contrasena: string, correo: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register.php`, usuarios);
  }

  // Método para iniciar sesión
  login(user: { correo: string, contrasena: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login.php`, user).pipe(
      tap(response => {
        if (response.success) {
          if (typeof window !== 'undefined') {
            localStorage.setItem('isLoggedIn', 'true'); // Establece el estado de inicio de sesión
            // Puedes guardar el usuario en localStorage si lo deseas
            localStorage.setItem('user', JSON.stringify(response.usuario)); // Opcional
          }
        }
      })
    );
  }

  // Método para cerrar sesión
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn'); // Elimina el estado de inicio de sesión
      localStorage.removeItem('user'); // Elimina la información del usuario
      this.toastr.success('¡Hasta pronto!');
    }
  }

  // Método para verificar si el usuario está logueado
  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isLoggedIn') === 'true';
      
    }
    return false; // Return false on server-side
  }
}
