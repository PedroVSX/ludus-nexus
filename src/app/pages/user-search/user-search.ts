import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-search',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-search.html',
  styleUrl: './user-search.scss',
})
export class UserSearch {
  username: string = '';
  errorMessage: string = '';

  search() {
    if (!this.username || this.username.trim() === '') {
      this.errorMessage = 'Por favor, insira um nome de usuário';
      return;
    }

    this.errorMessage = '';
    console.log('Buscando:', this.username);
  }
}
