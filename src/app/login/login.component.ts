import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuarios = { correo: '', contrasena: '' };

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  login(): void {
    this.authService.login(this.usuarios).subscribe({
      next: response => {
        if (response.success) {
          //alert('¡Inicio de sesión exitoso!');
          this.toastr.success('¡Inicio de sesión exitoso!');
          
          this.router.navigate(['/user-list']); // Redirige a /user-list
        } else {
         // alert('¡Error al iniciar sesión: ' + response.message + '!');
          this.toastr.error('¡Error al iniciar sesión: ' + response.message + '!');
        }
      },
      error: err => {
       // alert('Error en la comunicación con el servidor: ' + err.message);
        this.toastr.error('Error en la comunicación con el servidor: ' + err.message);
      }
    });
  }
}
