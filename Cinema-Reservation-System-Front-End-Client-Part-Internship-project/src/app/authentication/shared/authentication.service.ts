import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUser } from './create-user.model';
import { environment } from '../../../environments/environment';
import { LoginUser } from './login-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  register(createUser: CreateUser) {
    return this.http.post(`${this.apiUrl}/auth/register`, createUser);
  }

  login(loginUser: LoginUser) {
    return this.http.post<{ access_token: string }>(
      `${this.apiUrl}/auth/login`,
      loginUser,
    );
  }
}
