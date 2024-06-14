import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavigationComponent } from './navigation/main-navigation/main-navigation.component';
import { ToastListComponent } from './toasts/toast-list/toast-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainNavigationComponent, ToastListComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Cinema-Reservation-System-Front-End-Client-Part-Internship-project';
}
