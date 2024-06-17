import { Injectable } from '@angular/core';
import { Cinema } from '../models/cinema.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  baseUrl = environment.apiUrl;

  getMovie(movieId: string) {
    return this.http.get<Movie>(`${this.baseUrl}/movies/${movieId}`);
  }
}
