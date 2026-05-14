import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  imports: [],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCard {
  @Input() username: string = 'Usuário';
  @Input() profilePicture: string = 'https://placehold.co/200';
  @Input() totalGames: number = 0;
  @Input() totalWishlist: number = 0;
  @Input() totalFriends: number = 0;
}
