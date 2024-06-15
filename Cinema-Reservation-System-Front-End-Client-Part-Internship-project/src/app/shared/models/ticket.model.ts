import { Seat } from './hall.model';
import { Projection } from './projection.model';
import { Reservation } from './reservation.model';

export interface Ticket {
  projection: Projection;

  reservaton: Reservation;

  seat: Seat;

  seatRow: number;

  seatNumber: number;

  bought: Date;
}
