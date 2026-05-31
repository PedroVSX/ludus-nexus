import { Component, ChangeDetectorRef } from '@angular/core';
import { Header } from '../../components/header/header';
import { GameCard } from '../../components/game-card/game-card';
import { ProfileCard } from '../../components/profile-card/profile-card';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserProfile } from '../../models/user-profile';
import { Recommendation } from '../../models/recommendation';

import { UserService } from '../../services/user.service';
import { RecommendationService } from '../../services/recommendation.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Header, GameCard, ProfileCard, MatProgressSpinnerModule],
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

  constructor(
    private userService: UserService,
    private recommendationService: RecommendationService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.loadProfile();
    });
    this.loadRecommendations();
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
