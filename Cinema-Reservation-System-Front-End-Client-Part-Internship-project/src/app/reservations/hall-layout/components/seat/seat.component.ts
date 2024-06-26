import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';
import { Seat, SeatTypeName } from '../../../../shared/models/hall.model';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ReservationsService } from '../../../shared/reservations.service';
import { Reservation } from '../../../../shared/models/reservation.model';
import { Ticket } from '../../../../shared/models/ticket.model';

enum SeatStatus {
  SEAT_TAKEN = 'Taken',
  SEAT_FREE = 'Free',
  SEAT_SELECTED = 'Selected',
  SEAT_BlOCKED = 'Blocked',
}

@Component({
  selector: 'app-seat',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './seat.component.html',
})
export class SeatComponent implements OnInit {
  @Input() seat: Seat | null = null;
  @Input() seatRow: number = 0;
  @Input() seatNumber: number = 0;
  chairSvg = faChair;
  seatTypeEnum = SeatTypeName;
  seatSvgContent: SafeHtml = '';
  seatStatusEnum = SeatStatus;
  seatStatus: SeatStatus = this.seatStatusEnum.SEAT_FREE;
  color: 'green' | 'red' | 'orange' | 'gray' = 'green';

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private reservationsService: ReservationsService,
  ) {}

  ngOnInit(): void {
    this.updateSeatStatus();

    this.reservationsService.selectedSeat.subscribe((selectedSeat) => {
      if (selectedSeat !== null) {
        this.updateSeatStatus();
        this.updateColor();
      }
    });

    this.updateColor();
    if (this.seat?.type.image) {
      this.http
        .get(this.seat.type.image, { responseType: 'text' })
        .subscribe((svgContent) => {
          this.seatSvgContent =
            this.sanitizer.bypassSecurityTrustHtml(svgContent);
        });
    }
  }

  updateColor() {
    if (this.seatStatus == this.seatStatusEnum.SEAT_FREE) {
      this.color = 'green';
    } else if (this.seatStatus == this.seatStatusEnum.SEAT_TAKEN) {
      this.color = 'red';
    } else if (this.seatStatus == this.seatStatusEnum.SEAT_SELECTED) {
      this.color = 'gray';
    }
  }

  updateSeatStatus() {
    const isSelected =
      this.reservationsService.selectedSeat.value?.seat._id === this.seat?._id;
    if (this.seat) {
      if (
        this.isReserved(this.seat, this.reservationsService.reservations) ||
        this.isBought(this.seat, this.reservationsService.tickets)
      ) {
        this.seatStatus = this.seatStatusEnum.SEAT_TAKEN;
      } else if (isSelected) {
        this.seatStatus = this.seatStatusEnum.SEAT_SELECTED;
      } else {
        this.seatStatus = this.seatStatusEnum.SEAT_FREE;
      }
    }
  }

  setSeat() {
    if (
      this.seat &&
      this.seatRow &&
      this.seatNumber &&
      !this.isReserved(this.seat, this.reservationsService.reservations) &&
      !this.isBought(this.seat, this.reservationsService.tickets)
    ) {
      this.reservationsService.setSelectedSeat(
        this.seat,
        this.seatRow,
        this.seatNumber,
      );
    }
  }

  isReserved(seat: Seat, reservations: Reservation[]): boolean {
    return reservations.some((reservation) => {
      return reservation.seat === seat._id;
    });
  }

  isBought(seat: Seat, tickets: Ticket[]): boolean {
    return tickets.some((ticket) => {
      return ticket.seat === seat._id;
    });
  }
}
