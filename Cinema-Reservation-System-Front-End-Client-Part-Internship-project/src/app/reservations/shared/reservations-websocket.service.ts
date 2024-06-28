import { Injectable } from '@angular/core';
import io, { Socket } from 'socket.io-client';
import { SocketSeat } from '@shared/models/socket-seat.model';
import { Reservation } from '@shared/models/reservation.model';
import { BehaviorSubject } from 'rxjs';
import { Ticket } from '@shared/models/ticket.model';

enum SocketEvent {
  CONNECT = 'establishConnection',
  DISCONNECT = 'disconnectSocket',
  SET_SEAT = 'setSeat',
  UNSET_SEAT = 'unsetSeat',
  RESERVE_SEAT = 'reserveSeat',
  UNRESERVE_SEAT = 'unreserveSeat',
  BUY_SEAT = 'buySeat',
  ERROR = 'err',
}

@Injectable({
  providedIn: 'root',
})
export class ReservationsWebsocketService {
  socket: Socket | null = null;
  blockedSeats: BehaviorSubject<string[]> = new BehaviorSubject([] as string[]);

  setupSocketConnection() {
    this.socket = io('http://localhost:3000');

    this.socket.on(SocketEvent.SET_SEAT, (data: SocketSeat) => {
      const newBlockedSeats = [...this.blockedSeats.value, data._id];
      this.blockedSeats.next(newBlockedSeats);
    });

    this.socket.on(SocketEvent.UNSET_SEAT, (data: SocketSeat) => {
      const firstInstanceOfSeat = this.blockedSeats.value.findIndex(
        (seat) => seat === data._id,
      );
      const newBlockedSeats = [...this.blockedSeats.value];
      newBlockedSeats.splice(firstInstanceOfSeat, 1);
      this.blockedSeats.next(newBlockedSeats);
    });

    this.socket.on(SocketEvent.RESERVE_SEAT, (data: Reservation) => {
      const newBlockedSeats = [...this.blockedSeats.value, data.seat];

      this.blockedSeats.next(newBlockedSeats);
    });

    this.socket.on(SocketEvent.BUY_SEAT, (data: Ticket) => {
      const newBlockedSeats = [...this.blockedSeats.value, data.seat];

      this.blockedSeats.next(newBlockedSeats);
    });
  }

  disconnect() {
    if (this.socket) this.socket.disconnect();
  }

  setSeat(state: SocketSeat) {
    if (this.socket) this.socket.emit(SocketEvent.SET_SEAT, state);
  }

  unsetSeat(state: SocketSeat) {
    if (this.socket) this.socket.emit(SocketEvent.UNSET_SEAT, state);
  }

  reserveSeat(state: Reservation) {
    if (this.socket) this.socket.emit(SocketEvent.RESERVE_SEAT, state);
  }
}
