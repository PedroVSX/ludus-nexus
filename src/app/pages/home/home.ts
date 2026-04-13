import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { GameCard } from '../../components/game-card/game-card';

@Component({
  selector: 'app-home',
  imports: [Header, GameCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  username: string = 'Usuário';
}
