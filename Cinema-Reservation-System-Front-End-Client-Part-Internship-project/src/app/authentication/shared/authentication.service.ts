import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUser } from './create-user.model';
import { environment } from '../../../environments/environment';
import { LoginUser } from './login-user.model';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from './user-model';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { ToastService } from '../../toasts/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = environment.apiUrl;
  private userSubject = new BehaviorSubject<User | null>(null);
  public user = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService,
  ) {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      const user: User = jwtDecode(savedToken);
      this.userSubject.next(user);
    }
  }

  register(createUser: CreateUser) {
    return this.http.post(`${this.apiUrl}/auth/register`, createUser).pipe(
      tap(() => {
        this.toastService.addToast({
          message: 'Registered successfully!',
          type: 'success',
        });
        this.router.navigate(['/login']);
      }),
    );
  }

  login(loginUser: LoginUser) {
    return this.http
      .post<{ access_token: string }>(`${this.apiUrl}/auth/login`, loginUser)
      .pipe(
        tap((response) => {
          const user: User = jwtDecode(response.access_token);
          localStorage.setItem('token', response.access_token);
          this.router.navigate(['/program']);

          this.userSubject.next(user);
        }),
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }
}
