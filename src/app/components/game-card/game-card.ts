import { Component, Input } from '@angular/core';
import { PercentPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-game-card',
  imports: [PercentPipe, MatIconModule],
  templateUrl: './game-card.html',
  styleUrl: './game-card.scss',
})
export class GameCard {
  @Input() appId!: number;
  @Input() name: string = '';
  @Input() imageUrl: string = '';
  @Input() shortDescription: string = '';
  @Input() score: number = 0;

  openSteamPage(appId: number) {
    window.open(`https://store.steampowered.com/app/${appId}`, '_blank');
  }
}
