import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../../shared/models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMoviesWithProjections() {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies/cinema/${'664cedffce82675ad95c08e4'}?projections=true`); // Change static cinema id later
  }
}
