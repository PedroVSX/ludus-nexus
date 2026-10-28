
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';

import { UserService } from '../../services/user.service';
import { RecommendationService } from '../../services/recommendation.service';

import { UserProfile } from '../../models/user-profile';
import { Recommendation } from '../../models/recommendation';
import { HardwareInfo } from '../../models/hardware-info';

@Component({
  selector: 'app-loading',
  imports: [CommonModule, MatIconModule],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading implements OnInit, OnDestroy {

  username = '';

  selectedOption: 'hardware' | 'discovery' = 'hardware';
  hardware: HardwareInfo | null = null;

  currentMessageIndex = 0;
  isLoading = true;
  errorMessage = '';

  private messageInterval?: ReturnType<typeof setInterval>;
  private requestSubscription?: Subscription;

  readonly messages = [
    'Analisando seu perfil Steam...',
    'Descobrindo seus estilos de jogo favoritos...',
    'Explorando possibilidades no catálogo...',
    'Procurando jogos que combinam com você...',
    'Preparando sua próxima aventura...'
  ];

  readonly hardwareMessages = [
    'Analisando seu perfil Steam...',
    'Identificando seus estilos de jogo favoritos...',
    'Verificando os requisitos dos jogos...',
    'Buscando jogos para sua configuração...',
    'Preparando suas próximas aventuras...'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private recommendationService: RecommendationService
  ) {}

  ngOnInit(): void {
    this.username =
      this.route.snapshot.paramMap.get('username') ?? '';

    const state = history.state;

    this.selectedOption = state['selectedOption'] ?? 'hardware';
    this.hardware = state['hardware'] ?? null;

    this.messageInterval = setInterval(() => {
      this.currentMessageIndex =
        (this.currentMessageIndex + 1) % this.activeMessages.length;
    }, 3000);

    this.startLoading();
  }

  get activeMessages(): string[] {
    return this.selectedOption === 'hardware'
      ? this.hardwareMessages
      : this.messages;
  }

  get currentMessage(): string {
    return this.activeMessages[this.currentMessageIndex];
  }

  startLoading(): void {
    if (this.requestSubscription) {
      this.requestSubscription.unsubscribe();
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.currentMessageIndex = 0;

    this.requestSubscription = forkJoin({
      profile: this.userService.getProfile(this.username),
      recommendations:
        this.recommendationService.getRecommendations(this.username)
    }).subscribe({
      next: ({ profile, recommendations }) => {
        this.router.navigate(['/home', this.username], {
          state: {
            selectedOption: this.selectedOption,
            hardware: this.hardware,
            profile,
            recommendations
          }
        });
      },

      error: (err) => {
        console.error('Erro ao carregar recomendações:', err);

        this.isLoading = false;
        this.errorMessage =
          'Não conseguimos preparar suas recomendações. Verifique sua conexão e tente novamente.';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.messageInterval) {
      clearInterval(this.messageInterval);
    }

    this.requestSubscription?.unsubscribe();
  }
}
