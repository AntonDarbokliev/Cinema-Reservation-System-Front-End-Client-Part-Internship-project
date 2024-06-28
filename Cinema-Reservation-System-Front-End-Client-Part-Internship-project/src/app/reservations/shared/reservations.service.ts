import { Injectable } from '@angular/core';
import {
  CreateReservation,
  Reservation,
} from '@shared/models/reservation.model';
import { Ticket } from '@shared/models/ticket.model';
import { Seat } from '@shared/models/hall.model';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../authentication/shared/authentication.service';
import { MovieService } from '@shared/services/movie.service';
import { Projection } from '@shared/models/projection.model';
import { MenuItem } from '@shared/models/menu-item.model';
import { SidesService } from './sides.service';
import { ReservationsWebsocketService } from './reservations-websocket.service';

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
    private sidesService: SidesService,
    private reservationWebsocketService: ReservationsWebsocketService,
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
    const foodAndBeverages: MenuItem[] = [];

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
              userId: user.id,
              movieName: movie.name,
              moviePoster: movie.poster,
            };

            this.sidesService.getSides().subscribe((sides) => {
              Object.keys(this.sidesWithQuantity).forEach((sideId) => {
                const side = sides.find((side) => side._id === sideId);

                if (side) {
                  for (let i = 0; i < this.sidesWithQuantity[sideId]; i++) {
                    foodAndBeverages.push(side);
                  }
                }
              });

              if (foodAndBeverages.length > 0) {
                reservationToSend.foodAndBeverages = foodAndBeverages;
              }
              this.http
                .post<Reservation>(
                  this.baseUrl + '/reservations',
                  reservationToSend,
                )
                .subscribe((reservation) => {
                  this.reservationWebsocketService.reserveSeat(reservation);
                  // this.reservationWebsocketService.unsetSeat({
                  //   ...this.selectedSeat.value!.seat,
                  // projectionId: reservation.projectionId,
                  // });
                });
            });
          }
        });
      });
    }
  }
}
