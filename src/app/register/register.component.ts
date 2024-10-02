import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  usuarios = { nombre: '', contrasena: '', correo: '' };

  constructor(private authService: AuthService) { }

  register(): void {
    this.authService.register(this.usuarios).subscribe(response => {
      if (response.status === 'success') {
        alert('¡Registro exitoso!');
      } else {
        alert('¡Error al registrar!');
      }
    });
  }
}
