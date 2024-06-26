import { Component, OnInit } from '@angular/core';
import { Movie } from '@shared/models/movie.model';
import { ProjectionService } from '../shared/projections.service';
import { MovieWithProjectionsComponent } from '../movie-with-projections/movie-with-projections.component';
import { CinemaService } from '@shared/services/cinema.service';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { Cinema } from '@shared/models/cinema.model';
import { InputFieldComponent } from '@shared/components/input-field/input-field.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProjectionType } from '@shared/models/projection.model';

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
  proejctionTypesOptions: { value: ProjectionType; text: string }[] = [];
  selectedProjectionType: string = '';

  constructor(
    private projectionService: ProjectionService,
    private cinemaService: CinemaService,
  ) {
    this.date = new FormControl('');
  }

  ngOnInit(): void {
    this.subscribeToDateChanges();
    this.initializeDate();
    this.initializeProjectionTypeOptions();
    this.subscribeToCinemaChanges();
  }

  private initializeDate() {
    const date = new Date();
    const currentDate = date.toISOString().substring(0, 10);
    this.date.setValue(currentDate);
  }

  private subscribeToDateChanges(): void {
    this.date.valueChanges.subscribe((date) => {
      if (this.cinema) {
        if (this.selectedProjectionType !== '') {
          this.updateMovies(
            date,
            this.selectedProjectionType as ProjectionType,
          );
        } else {
          this.updateMovies(date);
        }
      }
    });
  }

  private updateMovies(date: string, projectionType?: ProjectionType) {
    this.projectionService
      .getMoviesWithProjections(date, projectionType)
      .subscribe((movies) => {
        this.movies = movies.filter((movie) => movie.projections.length !== 0);
      });
  }

  private subscribeToCinemaChanges() {
    this.cinemaService.cinema.subscribe((cinema) => {
      if (cinema.address !== '') {
        this.updateMovies(this.date.value);
        this.cinema = cinema;
      }
    });
  }

  private initializeProjectionTypeOptions() {
    this.proejctionTypesOptions = [];
    this.projectionService.getProjectionTypes().subscribe((projectionTypes) => {
      projectionTypes.forEach((projectionType) => {
        this.proejctionTypesOptions.push({
          value: projectionType,
          text: projectionType,
        });
      });
    });
  }

  onProjectionTypeChange(selected: string) {
    this.selectedProjectionType = selected;

    if (selected == '') {
      this.updateMovies(this.date.value);
    } else {
      this.updateMovies(this.date.value, selected as ProjectionType);
    }
  }
}
