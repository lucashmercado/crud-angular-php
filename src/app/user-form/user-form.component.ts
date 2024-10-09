import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: any = {
    id: null,
    name: '',
    email: '',
    phone: ''
  };
  isEditing = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        console.log('ID recibido:', params['id']); // Para debugging
        this.isEditing = true;
        this.loadUser(params['id']);
      }
    });
  }

  loadUser(id: number): void {
    this.apiService.getUserById(id).subscribe(
      (data) => {
        console.log('Usuario cargado:', data); // Para debugging

        this.user = data;
      },
      error => {
        console.error('Error al cargar usuario:', error);
        this.toastr.error('Error al cargar usuario');
      }
    );
  }

  saveUser(): void {
    console.log('Guardando usuario:', this.user); // Para debugging
    if (this.isEditing) {
      this.apiService.updateUser(this.user).subscribe(
        () => {
          console.log('Usuario actualizado exitosamente');
          this.toastr.success('Usuario actualizado exitosamente');
          this.router.navigate(['/user-list']);
        },
        error => {
          console.error('Error al actualizar usuario:', error);
          this.toastr.error('Error al actualizar usuario');
        }
      );
    } else {
      this.apiService.addUser(this.user).subscribe(
        () => {
          console.log('Usuario creado exitosamente');
          this.toastr.success('Usuario creado exitosamente');
          this.router.navigate(['/user-list']);
        },
        error => {
          console.error('Error al crear usuario:', error);
          this.toastr.error('Error al crear usuario');
        }
      );
    }
  }

  resetForm(): void {
    this.user = {
      id: null,
      name: '',
      email: '',
      phone: ''
    };
  }
}