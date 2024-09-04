import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'] // Corrige styleUrl a styleUrls
})
export class UserFormComponent implements OnInit {
  user = { name: '', email: '', phone: '' }; // Elimina el decorador @Input

  constructor(private apiService: ApiService) { }

  ngOnInit(): void { }

  addUser(): void {
    this.apiService.addUser(this.user).subscribe(() => {
      this.resetForm();
    });
  }

  resetForm(): void {
    this.user = {
      name: '',
      email: '',
      phone: ''
    };
  }
}
