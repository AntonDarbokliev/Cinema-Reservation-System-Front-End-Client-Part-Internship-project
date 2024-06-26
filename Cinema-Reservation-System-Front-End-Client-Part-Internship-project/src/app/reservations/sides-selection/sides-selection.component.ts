import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from '../../shared/models/menu-item.model';
import { SidesService } from '../shared/sides.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputFieldComponent } from '../../shared/components/input-field/input-field.component';
import { ReservationsService } from '../shared/reservations.service';

@Component({
  selector: 'app-sides-selection',
  standalone: true,
  imports: [ButtonComponent, InputFieldComponent],
  templateUrl: './sides-selection.component.html',
})
export class SidesSelectionComponent implements OnInit {
  sides: MenuItem[] = [];
  readMoreStates: { [key: string]: boolean } = {};

  constructor(
    private sidesService: SidesService,
    public reservationService: ReservationsService,
  ) {}

  ngOnInit(): void {
    this.sidesService.getSides().subscribe((sides) => {
      this.sides = sides;
    });
  }

  toggleReadMore(id: string) {
    this.readMoreStates[id] = !this.readMoreStates[id];
  }
  
  
}
