import { Component, Input } from '@angular/core';
import { Hall } from '../../shared/models/hall.model';
import { Ticket } from '../../shared/models/ticket.model';
import { Reservation } from '../../shared/models/reservation.model';
import { RowComponent } from './components/row/row.component';

@Component({
  selector: 'app-hall-layout',
  standalone: true,
  imports: [RowComponent],
  templateUrl: './hall-layout.component.html',
  styleUrl: './hall-layout.component.css',
})
export class HallLayoutComponent {
  @Input() hall: Hall | null = null;
  @Input() tickets: Ticket[] = [];
  @Input() reservations: Reservation[] = [];
}
