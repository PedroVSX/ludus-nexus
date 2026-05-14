import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { GameCard } from '../../components/game-card/game-card';
import { ProfileCard } from '../../components/profile-card/profile-card';

@Component({
  selector: 'app-home',
  imports: [Header, GameCard, ProfileCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  user = {
    username: 'Fulano',
    profilePicture: 'https://placehold.co/200',
    totalGames: 42,
    totalWishlist: 10,
    totalFriends: 5
  }


}
