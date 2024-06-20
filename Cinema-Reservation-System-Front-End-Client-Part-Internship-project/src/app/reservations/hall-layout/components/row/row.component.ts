import { Component, Input } from '@angular/core';
import { Row } from '../../../../shared/models/hall.model';
import { SeatComponent } from '../seat/seat.component';

@Component({
  selector: 'app-row',
  standalone: true,
  imports: [SeatComponent],
  templateUrl: './row.component.html',
  styleUrl: './row.component.css',
})
export class RowComponent {
  @Input() row: Row = { _id: '', seats: [] };
  @Input() rowNumber: number = 0;
}
