import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectionService } from '../../projections/shared/projections.service';
import { Projection } from '../../shared/models/projection.model';
import { Movie } from '../../shared/models/movie.model';
import { MovieService } from '../../shared/services/movie.service';

@Component({
  selector: 'app-reservation-page',
  standalone: true,
  imports: [],
  templateUrl: './reservation-page.component.html',
  styleUrl: './reservation-page.component.css',
})
export class ReservationPageComponent implements OnInit {
  projectionId: string | null = '';
  projection: Projection | null = null;
  movie: Movie | null = null;

  constructor(
    private route: ActivatedRoute,
    private projectionService: ProjectionService,
    private movieService: MovieService,
  ) {
    this.projectionId = this.route.snapshot.paramMap.get('projectionId');
  }

  ngOnInit(): void {
    if (this.projectionId) {
      this.projectionService
        .getProjection(this.projectionId)
        .subscribe((projection) => {
          this.projection = projection;
          this.initializeMovie(projection);
        });
    }
  }

  private initializeMovie(projection: Projection) {
    this.movieService.getMovie(projection.movieId).subscribe((movie) => {
      this.movie = movie;
    });
  }
}
