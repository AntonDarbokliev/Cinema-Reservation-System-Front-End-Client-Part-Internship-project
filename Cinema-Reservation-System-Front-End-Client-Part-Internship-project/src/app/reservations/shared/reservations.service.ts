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
  sidesWithQuantity: { [key: string]: number } = {};

  setReservations(data: Reservation[]) {
    this.reservations = data;
  }

  setTickets(data: Ticket[]) {
    this.tickets = data;
  }

  setSelectedSeat(data: Seat | null) {
    this.selectedSeat.next(data);
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
}
