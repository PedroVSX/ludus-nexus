import { Component, Input } from '@angular/core';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'app-game-card',
  imports: [PercentPipe],
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
