import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';
import { Seat, SeatTypeName } from '../../../../shared/models/hall.model';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-seat',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.css',
})
export class SeatComponent implements OnInit {
  @Input() seat: Seat | null = null;
  chairSvg = faChair;
  seatTypeEnum = SeatTypeName;
  seatSvgContent: SafeHtml = '';

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    if (this.seat?.type.image) {
      this.http
        .get(this.seat.type.image, { responseType: 'text' })
        .subscribe((svgContent) => {
          this.seatSvgContent =
            this.sanitizer.bypassSecurityTrustHtml(svgContent);
        });
    }
  }
}
