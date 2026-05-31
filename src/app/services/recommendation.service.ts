import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Recommendation } from '../models/recommendation';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

    private apiUrl = 'http://localhost:8081/recommendations';

    constructor(private http: HttpClient) {}

    getRecommendations(username: string): Observable<Recommendation[]> {
        return this.http.get<Recommendation[]>(`${this.apiUrl}/${username}`);
    }
}