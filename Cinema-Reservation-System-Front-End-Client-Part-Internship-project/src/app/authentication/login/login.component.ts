import { Component, OnInit } from '@angular/core';
import { InputFieldComponent } from '@shared/components/input-field/input-field.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputFieldComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe();
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
