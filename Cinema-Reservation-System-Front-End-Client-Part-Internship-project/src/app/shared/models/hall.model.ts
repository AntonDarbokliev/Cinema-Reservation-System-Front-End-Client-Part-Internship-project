export enum SeatType {
  SEAT_COMMON = 'Common',
  SEAT_VIP = 'VIP',
  SEAT_COUPLES = 'Couples',
  SEAT_BLANK = 'blank',
}

export interface Seat {
  type: SeatType;
  _id: string;
}

export interface Row {
  seats: Seat[];
  _id: string;
}

export interface Hall {
  seatsLayout: Row[];

  numberOfSeats: number;

  cinemaId: string;

  name: string;
}
