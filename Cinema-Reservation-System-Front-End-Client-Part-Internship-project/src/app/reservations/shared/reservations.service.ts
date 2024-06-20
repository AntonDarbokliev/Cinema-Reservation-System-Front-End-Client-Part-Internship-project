import { Injectable } from '@angular/core';
import {
  CreateReservation,
  Reservation,
} from '../../shared/models/reservation.model';
import { Ticket } from '../../shared/models/ticket.model';
import { Seat } from '../../shared/models/hall.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../authentication/shared/authentication.service';
import { MovieService } from '../../shared/services/movie.service';
import { Movie } from '../../shared/models/movie.model';
import { Projection } from '../../shared/models/projection.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  reservations: Reservation[] = [];
  tickets: Ticket[] = [];
  selectedSeat: BehaviorSubject<{
    seat: Seat;
    seatRow: number;
    seatNumber: number;
  } | null> = new BehaviorSubject<{
    seat: Seat;
    seatRow: number;
    seatNumber: number;
  } | null>(null);
  sidesWithQuantity: { [key: string]: number } = {};

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private movieService: MovieService,
  ) {}

  baseUrl = environment.apiUrl;

  setReservations(data: Reservation[]) {
    this.reservations = data;
  }

  setTickets(data: Ticket[]) {
    this.tickets = data;
  }

  setSelectedSeat(data: Seat | null, seatRow?: number, seatNumber?: number) {
    if (data && seatRow && seatNumber) {
      this.selectedSeat.next({ seat: data, seatNumber, seatRow });
    } else {
      this.selectedSeat.next(null);
    }
  }

  incrementItemQuantity(id: string) {
    if (this.sidesWithQuantity[id]) {
      const newValue = this.sidesWithQuantity[id] + 1;
      if (newValue > 99) {
        return;
      }
      this.sidesWithQuantity[id] = newValue;
    } else {
      this.sidesWithQuantity[id] = 1;
    }
  }

  decrementItemQuantity(id: string) {
    if (this.sidesWithQuantity[id]) {
      const newValue = this.sidesWithQuantity[id] - 1;
      if (newValue === 0) {
        delete this.sidesWithQuantity[id];
      } else {
        this.sidesWithQuantity[id] = newValue;
      }
    }
  }

  makeReservation(projection: Projection) {
    let reservationToSend: CreateReservation;

    if (projection._id && this.selectedSeat.value) {
      this.movieService.getMovie(projection.movieId).subscribe((movie) => {
        this.authService.user.subscribe((user) => {
          console.log('User: ', user);

          if (user) {
            reservationToSend = {
              seat: this.selectedSeat.value!.seat._id,
              seatRow: this.selectedSeat.value!.seatRow,
              seatNumber: this.selectedSeat.value!.seatNumber,
              projectionId: projection._id,
              user: user.id,
              movieName: movie.name,
              moviePoster: movie.poster,
            };
            this.http
              .post(this.baseUrl + '/reservations', reservationToSend)
              .subscribe();
          }
        });
      });
    }
  }
}
