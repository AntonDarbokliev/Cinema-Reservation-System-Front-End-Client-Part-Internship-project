import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-projection-bubble',
  standalone: true,
  imports: [],
  templateUrl: './projection-bubble.component.html',
})
export class ProjectionBubbleComponent {
 @Input() startTime: string = '';
}
