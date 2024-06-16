import { Component, OnInit } from '@angular/core';
import { Movie } from '../../shared/models/movie.model';
import { ProjectionService } from '../shared/projections.service';
import { MovieWithProjectionsComponent } from '../movie-with-projections/movie-with-projections.component';
import { CinemaService } from '../../shared/services/cinema.service';

@Component({
  selector: 'app-projections-list',
  standalone: true,
  imports: [MovieWithProjectionsComponent],
  templateUrl: './projections-list.component.html',
  styleUrl: './projections-list.component.css',
})
export class ProjectionsListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(
    private projectionService: ProjectionService,
    private cinemaService: CinemaService,
  ) {}

  ngOnInit(): void {
    this.cinemaService.cinema.subscribe((cinema) => {
      if (cinema.address !== '') {
        this.projectionService
          .getMoviesWithProjections()
          .subscribe((movies) => {
            this.movies = movies;
          });
      }
    });
  }
}
