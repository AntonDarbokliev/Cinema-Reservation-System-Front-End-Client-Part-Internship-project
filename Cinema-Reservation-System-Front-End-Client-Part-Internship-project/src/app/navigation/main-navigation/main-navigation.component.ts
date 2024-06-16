import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InputFieldComponent } from '../../shared/components/input-field/input-field.component';
import { AuthenticationService } from '../../authentication/shared/authentication.service';
import { User } from '../../authentication/shared/user-model';
import { CinemaService } from '../../shared/services/cinema.service';
import { Cinema } from '../../shared/models/cinema.model';
import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import {
  faLocationDot,
  faMagnifyingGlass,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-main-navigation',
  standalone: true,
  imports: [
    RouterLink,
    InputFieldComponent,
    DropdownComponent,
    FontAwesomeModule,
  ],
  templateUrl: './main-navigation.component.html',
})
export class MainNavigationComponent {
  user: User | null = null;
  cinemas: Cinema[] = [];
  cinema: Cinema = this.cinemaService.cinema.getValue();
  options: any[] = [];
  faLocationDot = faLocationDot;
  faMagnifyingGlass = faMagnifyingGlass;
  faUser = faUser;
  selectedCinema: Cinema | null = null;

  constructor(
    private authService: AuthenticationService,
    public cinemaService: CinemaService,
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
    this.cinemaService.getCinemas().subscribe((cinemas) => {
      this.cinemas = cinemas;
      this.cinemaService.setCinema(cinemas[0]);
      this.cinema = this.cinemaService.cinema.getValue();
      this.cinemas.forEach((cinema) => {
        this.options.push({ value: cinema._id, text: cinema.name });
      });
    });
    this.cinemaService.cinema.subscribe((cinema) => {
      this.selectedCinema = cinema;
    });
  }

  onDropdownSelectionChange(selected: string) {
    console.log('Selected option:', selected);
    const cinemaToSet = this.cinemas.find((cinema) => cinema._id === selected);
    if (cinemaToSet) this.cinemaService.setCinema(cinemaToSet);
  }
}
