import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InputFieldComponent } from '../../shared/components/input-field/input-field.component';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../authentication/shared/authentication.service';
import { User } from '../../authentication/shared/user-model';

@Component({
  selector: 'app-main-navigation',
  standalone: true,
  imports: [RouterLink, InputFieldComponent],
  templateUrl: './main-navigation.component.html',
})
export class MainNavigationComponent {
  user: User | null = null;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }
}
