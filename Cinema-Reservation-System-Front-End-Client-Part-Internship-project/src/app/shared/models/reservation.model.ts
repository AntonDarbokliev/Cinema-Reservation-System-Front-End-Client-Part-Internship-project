import { Seat } from './hall.model';
import { Projection } from './projection.model';

export enum ReservationStatus {
  ACTIVE = 'Active',
  CANCELLED = 'Cancelled',
  COMPLETED = 'Completed',
}

export interface Reservation {
  seat: Seat;

  seatRow: number;

  seatNumber: number;

  made: Date;

  projectionId: Projection;

  status: ReservationStatus;

  userId: string;

  movieName: string;

  moviePoster: string;

  projection: Projection;
}
