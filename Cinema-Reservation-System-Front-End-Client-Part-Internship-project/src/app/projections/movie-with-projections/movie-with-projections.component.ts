import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Movie } from '../../shared/models/movie.model';
import { Rating } from '../../shared/models/rating.model';
import {
  Projection,
  ProjectionStatus,
  ProjectionType,
} from '../../shared/models/projection.model';
import { RatingBubbleComponent } from '../../shared/components/rating-bubble/rating-bubble.component';

import { ProjectionBubbleComponent } from '../../shared/components/projection-bubble/projection-bubble.component';

@Component({
  standalone: true,
  selector: 'app-movie-with-projections',
  templateUrl: './movie-with-projections.component.html',
  imports: [RatingBubbleComponent, ProjectionBubbleComponent],
})
export class MovieWithProjectionsComponent implements OnChanges {
  @Input() movie: Movie | null = null;
  allProjectionTypes: ProjectionType[] = [];

  filterFunc(prj: Projection, prjType: ProjectionType) {
    return prj.projectionType !== prjType;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movie'] && this.movie) {
      this.allProjectionTypes = [];
      this.calculateProjectionTypes(this.movie);
    }
  }

  private calculateProjectionTypes(movie: Movie) {
    for (const projection of movie.projections) {
      if (
        !this.allProjectionTypes.includes(projection.projectionType) &&
        projection.status !== ProjectionStatus.PROJECTION_ENDED
      ) {
        this.allProjectionTypes.push(projection.projectionType);
      }
    }
  }
}
