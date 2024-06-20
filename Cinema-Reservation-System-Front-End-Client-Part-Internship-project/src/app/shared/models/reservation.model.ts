import { Seat } from './hall.model';
import { MenuItem } from './menu-item.model';
import { Projection } from './projection.model';

export enum ReservationStatus {
  ACTIVE = 'Active',
  CANCELLED = 'Cancelled',
  COMPLETED = 'Completed',
}

export interface Reservation {
  seat: string;

  seatRow: number;

  seatNumber: number;

  made: Date;

  projectionId: Projection;

  status: ReservationStatus;

  user: string;

  movieName: string;

  moviePoster: string;

  projection: Projection;
}

export interface CreateReservation {
  seat: string;

  seatRow: number;

  seatNumber: number;

  projectionId: string;

  userId: string;

  movieName: string;

  moviePoster: string;

  foodAndBeverages?: MenuItem[];
}
