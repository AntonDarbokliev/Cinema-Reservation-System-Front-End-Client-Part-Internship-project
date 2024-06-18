import { Injectable } from '@angular/core';
import { Reservation } from '../../shared/models/reservation.model';
import { Ticket } from '../../shared/models/ticket.model';
import { Seat } from '../../shared/models/hall.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  reservations: Reservation[] = [];
  tickets: Ticket[] = [];
  selectedSeat: BehaviorSubject<Seat | null> = new BehaviorSubject<Seat | null>(
    null,
  );

  setReservations(data: Reservation[]) {
    this.reservations = data;
  }

  setTickets(data: Ticket[]) {
    this.tickets = data;
  }

  setSelectedSeat(data: Seat | null) {
    this.selectedSeat.next(data);
  }
}
