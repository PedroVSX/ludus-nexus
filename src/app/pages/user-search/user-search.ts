import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-search',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-search.html',
  styleUrl: './user-search.scss',
})
export class UserSearch {
  username: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  search() {
    if (!this.username || this.username.trim() === '') {
      this.errorMessage = 'Por favor, insira um nome de usuário';
      return;
    }

    this.errorMessage = '';

    this.userService.getProfile(this.username).subscribe({
      next: () => {
        // usuário existe
        this.router.navigate(['/home', this.username]);
        console.log('Usuário encontrado, redirecionando para home...');
      },

      error: () => {
        // usuário não existe
        this.errorMessage = 'Perfil privado ou não encontrado';
        this.cdr.detectChanges();
      }
    });
  }
}
