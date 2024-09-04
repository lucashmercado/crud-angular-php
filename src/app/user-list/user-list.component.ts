import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = []; // Asegúrate de que esta propiedad esté inicializada

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadUsers(); // Carga la lista de usuarios al inicializar el componente
  }

  loadUsers(): void {
    this.apiService.getusers().subscribe((data: any[]) => {
      this.users = data; // Asigna los datos a la propiedad users
    });
  }

  deleteUser(userId: number): void {
    this.apiService.deleteUser(userId).subscribe(() => {
      this.loadUsers(); // Recarga la lista de usuarios después de eliminar
    });
  }
}

