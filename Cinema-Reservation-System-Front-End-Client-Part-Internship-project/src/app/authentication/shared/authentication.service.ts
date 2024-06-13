import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUser } from './create-user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  register(createUser: CreateUser) {
    return this.http.post(`${this.apiUrl}/auth/register`, createUser);
  }
}
