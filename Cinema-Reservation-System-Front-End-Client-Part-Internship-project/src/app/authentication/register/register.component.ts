import { Component } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputFieldComponent } from '@shared/components/input-field/input-field.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonComponent, InputFieldComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  buttonLabel: string = 'Register';
  placeHolders = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
  };
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
  ) {}

  registerForm: FormGroup = new FormGroup({});
  formSubmitted = false;

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      lastName: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      confirmPassword: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe();
    }
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
