import { Component, ChangeDetectorRef } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { GameCard } from '../../components/game-card/game-card';
import { ProfileCard } from '../../components/profile-card/profile-card';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { UserProfile } from '../../models/user-profile';
import { Recommendation } from '../../models/recommendation';

import { UserService } from '../../services/user.service';
import { RecommendationService } from '../../services/recommendation.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Header, Footer, GameCard, ProfileCard, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  
  username = 'thevieirinhaa';
  profile: UserProfile | null = null;
  recommendations: Recommendation[] = [];
  visibleGames: Recommendation[] = [];
  currentLimit = 4;
  isProfileLoading = true;
  isRecommendationsLoading = true;

  selectedOption: 'hardware' | 'discovery' = 'hardware';
  hardware: any = null;

  constructor(
    private userService: UserService,
    private recommendationService: RecommendationService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  
  ngOnInit(): void {
    const state = history.state;

    this.selectedOption = state['selectedOption'] ?? 'hardware';
    this.hardware = state['hardware'] ?? null;

    const hasProfile = !!state['profile'];
    const hasRecommendations =
      Array.isArray(state['recommendations']);

    if (hasProfile) {
      this.profile = state['profile'];
      this.isProfileLoading = false;
    }

    if (hasRecommendations) {
      this.recommendations = state['recommendations'];
      this.visibleGames = this.recommendations.slice(
        0,
        this.currentLimit
      );
      this.isRecommendationsLoading = false;
    }

    this.route.paramMap.subscribe(params => {
      this.username = params.get('username') ?? '';

      // Busca novamente somente se os dados não vieram do Loading.
      if (!hasProfile) {
        this.loadProfile();
      }

      if (!hasRecommendations) {
        this.loadRecommendations();
      }
    });
  }

  loadProfile() {
    this.userService.getProfile(this.username).subscribe({
      next: (response) => {
        this.profile = response;
        this.isProfileLoading = false;
        this.cdr.detectChanges();
        console.log(this.profile);
      },

      error: (err) => {
        console.error('Error fetching user profile:', err);
        this.isProfileLoading = false;
      }
    });
  }

  loadRecommendations() {
    this.recommendationService.getRecommendations(this.username).subscribe({
      next: (response) => {
        this.recommendations = response;
        this.visibleGames = this.recommendations.slice(0, this.currentLimit);
        this.isRecommendationsLoading = false;
        this.cdr.detectChanges();
        console.log(this.recommendations);
      },
      error: (err) => {
        console.error('Error fetching recommendations:', err);
        this.isRecommendationsLoading = false;
      }
    });
  }

  showMoreGames() {
    this.currentLimit += 4;
    this.visibleGames = this.recommendations.slice(0, this.currentLimit);
  }

}
