import { Component, Input, OnInit } from '@angular/core';
import { Hall } from '../../shared/models/hall.model';
import { Ticket } from '../../shared/models/ticket.model';
import { Reservation } from '../../shared/models/reservation.model';
import { RowComponent } from './components/row/row.component';
import { Projection } from '../../shared/models/projection.model';

@Component({
  selector: 'app-hall-layout',
  standalone: true,
  imports: [RowComponent],
  templateUrl: './hall-layout.component.html',
})
export class HallLayoutComponent {
  @Input() hall: Hall | null = null;
}
