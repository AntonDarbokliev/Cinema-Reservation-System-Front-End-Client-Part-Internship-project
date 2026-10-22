import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectionService } from '../../projections/shared/projections.service';
import { Projection } from '../../shared/models/projection.model';
import { Movie } from '../../shared/models/movie.model';
import { MovieService } from '../../shared/services/movie.service';
import { HallLayoutComponent } from '../hall-layout/hall-layout.component';
import { ReservationsService } from '../shared/reservations.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { SidesSelectionComponent } from '../sides-selection/sides-selection.component';
import { SummaryComponent } from '../summary/summary.component';
import { DonePageComponent } from '../done-page/done-page.component';
import { ReservationsWebsocketService } from '../shared/reservations-websocket.service';

enum ReservationStage {
  'SEAT_SELECTION' = 0,
  'SIDES_SELECTION' = 1,
  'SUMMARY' = 2,
  'DONE' = 3,
}

@Component({
  selector: 'app-reservation-page',
  standalone: true,
  imports: [
    HallLayoutComponent,
    ButtonComponent,
    SidesSelectionComponent,
    SummaryComponent,
    DonePageComponent,
  ],
  templateUrl: './reservation-page.component.html',
  styleUrl: './reservation-page.component.css',
})
export class ReservationPageComponent implements OnInit, OnDestroy {
  projectionId: string | null = '';
  projection: Projection | null = null;
  movie: Movie | null = null;
  stage: ReservationStage = ReservationStage.SEAT_SELECTION;
  enum: typeof ReservationStage = ReservationStage;
  showNextButton: boolean = false;
  showPreviousButton: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private projectionService: ProjectionService,
    private movieService: MovieService,
    private reservationsService: ReservationsService,
    private reservationsWebsocketService: ReservationsWebsocketService,
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
          this.initializeReservations(projection);
          this.initializeTickets(projection);
        });
      this.reservationsService.selectedSeat.subscribe((selectedSeat) => {
        if (selectedSeat) {
          this.showNextButton = true;
        }
      });
      this.reservationsWebsocketService.setupSocketConnection();
    }
  }

  ngOnDestroy(): void {
    this.unsetWebsocketSeat();
    this.reservationsService.setSelectedSeat(null);
    this.reservationsService.sidesWithQuantity = {};
    this.reservationsWebsocketService.disconnect();
  }

  private initializeMovie(projection: Projection) {
    this.movieService.getMovie(projection.movieId).subscribe((movie) => {
      this.movie = movie;
    });
  }

  private initializeReservations(projection: Projection) {
    this.reservationsService.setReservations(projection.reservations);
  }

  private initializeTickets(projection: Projection) {
    this.reservationsService.setTickets(projection.tickets);
  }

  goToNextStage() {
    if (this.stage == this.enum.SEAT_SELECTION) {
      this.stage = this.enum.SIDES_SELECTION;
      this.showPreviousButton = true;
    } else {
      this.stage = this.enum.SUMMARY;
      this.showPreviousButton = true;
      this.showNextButton = false;
    }

    if (this.stage === this.enum.SIDES_SELECTION) {
      this.setWebsocketSeat();
    }
  }

  goToPreviousPage() {
    if (this.stage == this.enum.SIDES_SELECTION) {
      this.stage = this.enum.SEAT_SELECTION;
      this.showPreviousButton = false;
    } else {
      this.stage = this.enum.SIDES_SELECTION;
      this.showNextButton = true;
    }

    if (this.stage === this.enum.SEAT_SELECTION) {
      this.unsetWebsocketSeat();
    }
  }

  reserveSeat() {
    if (this.projection) {
      this.reservationsService.makeReservation(this.projection);
      this.stage = this.enum.DONE;
    }
  }

  setWebsocketSeat() {
    if (this.reservationsService.selectedSeat.value) {
      this.reservationsWebsocketService.setSeat({
        ...this.reservationsService.selectedSeat.value!.seat,
        projectionId: this.projectionId!,
      });
    }
  }

  unsetWebsocketSeat() {
    if (this.reservationsService.selectedSeat.value) {
      this.reservationsWebsocketService.unsetSeat({
        ...this.reservationsService.selectedSeat.value!.seat,
        projectionId: this.projectionId!,
      });
    }
  }
}
