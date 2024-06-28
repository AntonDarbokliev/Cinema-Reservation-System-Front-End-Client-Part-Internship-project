import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../shared/reservations.service';
import { ToastService } from '../../toasts/toast.service';
import { Router } from '@angular/router';
import { SidesService } from '../shared/sides.service';
import { MenuItem } from '@shared/models/menu-item.model';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.component.html',
})
export class SummaryComponent implements OnInit {
  constructor(
    public reservationsService: ReservationsService,
    private toastService: ToastService,
    private router: Router,
    private sidesService: SidesService,
  ) {}

  sides: MenuItem[] = [];
  totalPrice: number = 0;
  sidesWithPositiveQuantity: MenuItem[] = [];

  ngOnInit(): void {
    this.sidesService.getSides().subscribe((sides) => {
      this.sides = sides;
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): number {
    if (!this.reservationsService.selectedSeat.value?.seat.type.price) {
      this.emitErrorToast();
      return 0;
    }
    this.totalPrice +=
      this.reservationsService.selectedSeat.value.seat.type.price;

    Object.keys(this.reservationsService.sidesWithQuantity).forEach((key) => {
      const side = this.sides.find((side) => side._id === key);
      if (side) {
        this.totalPrice +=
          side.price * this.reservationsService.sidesWithQuantity[key];

        this.sidesWithPositiveQuantity.push(side);
      } else {
        this.emitErrorToast();
      }
    });
    console.log(this.sidesWithPositiveQuantity);

    return this.totalPrice;
  }

  private emitErrorToast() {
    this.router.navigate(['/program']);

    this.toastService.addToast({
      type: 'error',
      message: 'An error occured while calculating the price, please try again',
    });
  }
}
