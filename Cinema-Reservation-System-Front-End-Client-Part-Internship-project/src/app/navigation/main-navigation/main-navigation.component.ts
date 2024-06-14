import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InputFieldComponent } from '../../shared/input-field/input-field.component';

@Component({
  selector: 'app-main-navigation',
  standalone: true,
  imports: [RouterLink, InputFieldComponent],
  templateUrl: './main-navigation.component.html',
})
export class MainNavigationComponent {}
