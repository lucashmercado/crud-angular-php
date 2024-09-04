import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = { nombre: '', contraseña: '', correo: '' };

  constructor(private authService: AuthService) { }

  register(): void {
    this.authService.register(this.user).subscribe(response => {
      if (response.status === 'success') {
        alert('¡Registro exitoso!');
      } else {
        alert('¡Error al registrar!');
      }
    });
  }
}
