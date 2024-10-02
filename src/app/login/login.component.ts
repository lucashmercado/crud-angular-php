import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = { nombre: '', contrasena: '' };

  constructor(private authService: AuthService) { }

  login(): void {
    this.authService.login(this.user).subscribe(response => {
      if (response.status === 'success') {
        alert('¡Inicio de sesión exitoso!');
        // Aquí puedes redirigir al usuario a otra página o almacenar el token en el local storage
      } else {
        alert('¡Error al iniciar sesión!');
      }
    });
  }
}
