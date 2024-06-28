import { Injectable } from '@angular/core';
import io, { Socket } from 'socket.io-client';
import { SocketSeat } from '@shared/models/socket-seat.model';
import { Reservation } from '@shared/models/reservation.model';
import { BehaviorSubject } from 'rxjs';

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
  blockedSeats: BehaviorSubject<SocketSeat[]> = new BehaviorSubject(
    [] as SocketSeat[],
  );

  setupSocketConnection() {
    this.socket = io('http://localhost:3000');
    this.socket.on(SocketEvent.SET_SEAT, (data: SocketSeat) => {
      const newBlockedSeats = [...this.blockedSeats.value, data];
      this.blockedSeats.next(newBlockedSeats);
    });
    this.socket.on(SocketEvent.UNSET_SEAT, (data: SocketSeat) => {
      this.blockedSeats.next(
        this.blockedSeats.value.filter((seat) => seat._id !== data._id),
      );
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
