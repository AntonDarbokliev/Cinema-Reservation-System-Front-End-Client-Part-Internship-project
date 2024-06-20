import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CinemaService } from '../../shared/services/cinema.service';
import { environment } from '../../../environments/environment';
import { MenuItem } from '../../shared/models/menu-item.model';

@Injectable({
  providedIn: 'root',
})
export class SidesService {
  constructor(
    private http: HttpClient,
    private cinemaService: CinemaService,
  ) {}

  baseUrl = environment.apiUrl;

  getSides() {
    return this.http.get<MenuItem[]>(
      `${this.baseUrl}/food-and-beverages/${this.cinemaService.cinema.value._id}`,
      // `${this.baseUrl}/food-and-beverages/664cedffce82675a/d95c08e4`,
    );
  }
}
