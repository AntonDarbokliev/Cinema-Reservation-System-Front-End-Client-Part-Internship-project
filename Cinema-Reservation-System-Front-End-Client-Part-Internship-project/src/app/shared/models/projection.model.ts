import { Hall } from './hall.model';
import { Reservation } from './reservation.model';
import { Ticket } from './ticket.model';

export enum ProjectionType {
  PROJECTION_2D = '2D',
  PROJECTION_3D = '3D',
  PROJECTION_4DX = '4DX',
}

export enum ProjectionStatus {
  PROJECTION_SCHEDULED = 'Scheduled',
  PROJECTION_AWAITING = 'Awaiting',
  PROJECTION_RUNNING = 'Running',
  PROJECTION_ENDED = 'Ended',
}

export interface Projection {
  startTime: string;

  startDate: Date;

  cinemaId: string;

  hall: Hall;

  movieId: string;

  minutesAwaitingStatusMargin: number;

  movieLength: Date;

  projectionType: ProjectionType;

  baseTicketPrice: number;

  reservations: Reservation[];

  status: ProjectionStatus;

  tickets: Ticket[];

  _id: string;
}
