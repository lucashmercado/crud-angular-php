import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css' ] // Corrige "styleUrl" a "styleUrls"
})
export class NavBarComponent {
  constructor(public authService: AuthService) { } // Inyecta el servicio de autenticación

  logout(): void {
    this.authService.logout(); // Llama al método logout del servicio
    // Aquí puedes redirigir a la página de inicio o login si es necesario
  }
}
