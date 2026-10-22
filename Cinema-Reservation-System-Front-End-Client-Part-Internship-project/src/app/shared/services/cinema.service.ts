import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cinema } from '../models/cinema.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CinemaService {
  constructor(private http: HttpClient) {}

  baseUrl = environment.apiUrl;

  cinema = new BehaviorSubject<Cinema>({
    address: '',
    halls: [],
    menu: [],
    movies: [],
    name: '',
    numberOfHalls: 0,
    minutesAwaitingStatusMargin: 0,
    _id: '',
  });

  setCinema(cinema: Cinema) {
    this.cinema.next(cinema);
  }

  getCinemas() {
    return this.http.get<Cinema[]>(`${this.baseUrl}/cinemas`);
  }
}
