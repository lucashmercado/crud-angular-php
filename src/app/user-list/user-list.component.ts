import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiService.getusers().subscribe(
      (data: any[]) => {
        console.log('Usuarios cargados:', data); // Para debugging
        this.users = data;
      },
      error => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  deleteUser(userId: number): void {
    this.apiService.deleteUser(userId).subscribe(
      () => {
        this.loadUsers();
      },
      error => {
        console.error('Error al eliminar usuario:', error);
      }
    );
  }

  editUser(userId: number): void {
    console.log('Editando usuario:', userId); // Para debugging
    this.router.navigate(['/user-form', userId]);
  }
}