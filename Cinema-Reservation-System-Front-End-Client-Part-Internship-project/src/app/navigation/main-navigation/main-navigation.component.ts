import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './main-navigation.component.html',
})
export class MainNavigationComponent {}
