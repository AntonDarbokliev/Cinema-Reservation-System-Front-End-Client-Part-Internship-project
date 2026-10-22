import { Routes } from '@angular/router';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { ProjectionsListComponent } from './projections/projections-list/projections-list.component';
import { ReservationPageComponent } from './reservations/reservation-page/reservation-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'program', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'program', component: ProjectionsListComponent },
  { path: 'reserve/:projectionId', component: ReservationPageComponent },
];
