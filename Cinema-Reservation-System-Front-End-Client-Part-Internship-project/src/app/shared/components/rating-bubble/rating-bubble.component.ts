import { Component, Input } from '@angular/core';
import { Rating } from '../../models/rating.model';

@Component({
  selector: 'app-rating-bubble',
  standalone: true,
  imports: [],
  templateUrl: './rating-bubble.component.html',
})
export class RatingBubbleComponent {
  @Input() rating: Rating = Rating.RATING_G;
}
