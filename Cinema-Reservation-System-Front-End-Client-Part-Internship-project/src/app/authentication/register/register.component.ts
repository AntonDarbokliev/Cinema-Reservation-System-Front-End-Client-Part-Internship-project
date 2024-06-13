import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { InputFieldComponent } from '../../shared/input-field/input-field.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonComponent, InputFieldComponent, ReactiveFormsModule, JsonPipe],
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

  registerForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    alert('Form Submitted');
  }
}
