import { Component, OnInit } from '@angular/core';
import { Movie } from '../../shared/models/movie.model';
import { ProjectionService } from '../shared/projections.service';
import { MovieWithProjectionsComponent } from '../movie-with-projections/movie-with-projections.component';
import { CinemaService } from '../../shared/services/cinema.service';
import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import { Cinema } from '../../shared/models/cinema.model';
import { InputFieldComponent } from '../../shared/components/input-field/input-field.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-projections-list',
  standalone: true,
  imports: [
    MovieWithProjectionsComponent,
    DropdownComponent,
    InputFieldComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './projections-list.component.html',
  styleUrl: './projections-list.component.css',
})
export class ProjectionsListComponent implements OnInit {
  movies: Movie[] = [];
  cinema: Cinema | null = null;
  date: FormControl = new FormControl('');

  constructor(
    private projectionService: ProjectionService,
    private cinemaService: CinemaService,
  ) {
    // const today = new Date();
    this.date = new FormControl('');
  }

  ngOnInit(): void {
    this.date.valueChanges.subscribe((date) => {
      this.projectionService
        .getMoviesWithProjections(date)
        .subscribe((movies) => {
          this.movies = movies;
        });
    });
    const date = new Date();
    const currentDate = date.toISOString().substring(0, 10);

    this.date.setValue(currentDate);

    this.cinemaService.cinema.subscribe((cinema) => {
      if (cinema.address !== '') {
        this.projectionService
          .getMoviesWithProjections(this.date.value)
          .subscribe((movies) => {
            this.movies = movies;
          });
        this.cinema = cinema;
      }
    });
  }
}
