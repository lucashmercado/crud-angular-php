import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  usuarios = { nombre: '', correo: '', contrasena: '' };

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    this.authService.register(this.usuarios).subscribe({
      next: response => {
        if (response.success) {
          alert('¡Registro exitoso!');
          this.router.navigate(['/login']); // Redirige al login después del registro
        } else {
          alert('¡Error al registrar: ' + response.message + '!');
        }
      },
      error: err => {
        alert('Error en la comunicación con el servidor: ' + err.message);
      }
    });
  }
}
