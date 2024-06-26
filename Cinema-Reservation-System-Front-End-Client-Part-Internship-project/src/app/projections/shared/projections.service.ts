import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../../shared/models/movie.model';
import { CinemaService } from '../../shared/services/cinema.service';
import { ProjectionType } from '../../shared/models/projection.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectionService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private cinemaService: CinemaService,
  ) {}

  getMoviesWithProjections(
    date?: string | Date,
    projectionType?: ProjectionType,
  ) {
    return this.http.get<Movie[]>(
      `${this.apiUrl}/movies/cinema/${this.cinemaService.cinema.getValue()._id}?projections=true${date ? `&date=${date}` : ''}${projectionType ? `&projectionType=${projectionType}` : ''}`,
    );
  }

  getProjectionTypes() {
    return this.http.get<ProjectionType[]>(`${this.apiUrl}/projections/types`);
  }
}
