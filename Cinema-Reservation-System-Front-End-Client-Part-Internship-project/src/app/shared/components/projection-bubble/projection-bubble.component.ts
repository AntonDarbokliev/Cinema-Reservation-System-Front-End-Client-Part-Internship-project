import { Component, Input } from '@angular/core';
import { Projection } from '../../models/projection.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projection-bubble',
  standalone: true,
  imports: [],
  templateUrl: './projection-bubble.component.html',
})
export class ProjectionBubbleComponent {
  @Input() projection: Projection | null = null;

  constructor(private router: Router) {}

  public redirectToReserve() {
    this.router.navigate([`/reserve/${this.projection?._id}`]);
  }
}
