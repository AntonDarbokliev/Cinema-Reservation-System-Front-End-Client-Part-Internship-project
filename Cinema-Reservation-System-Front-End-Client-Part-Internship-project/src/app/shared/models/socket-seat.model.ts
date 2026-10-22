import { Seat } from "./hall.model";

export interface SocketSeat extends Seat {
  projectionId: string;
}
