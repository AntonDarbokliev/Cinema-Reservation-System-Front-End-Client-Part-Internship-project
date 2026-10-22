import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-done-page',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './done-page.component.html',
  styleUrl: './done-page.component.css',
})
export class DonePageComponent implements OnInit {
  checkCircleIcon = faCheckCircle;

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/program']);
    }, 3000);
  }
}
