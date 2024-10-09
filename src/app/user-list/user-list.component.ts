import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiService.getusers().subscribe(
      (data: any[]) => {
        console.log('Usuarios cargados:', data); // Para debugging
       // this.toastr.success('Usuarios cargados exitosamente');
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
        this.toastr.success('Usuario eliminado exitosamente');
      },
      error => {
        console.error('Error al eliminar usuario:', error);
        this.toastr.error('Error al eliminar el usuario');
      }
    );
  }

  editUser(userId: number): void {
    console.log('Editando usuario:', userId); // Para debugging
    this.router.navigate(['/user-form', userId]);
  }
}