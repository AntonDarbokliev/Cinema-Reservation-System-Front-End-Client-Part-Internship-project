import { Component, Input, OnInit } from '@angular/core';
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
export class MovieWithProjectionsComponent implements OnInit {
  @Input() movie: Movie | null = null;
  allProjectionTypes: ProjectionType[] = [];

  filterFunc(prj: Projection, prjType: ProjectionType) {
    return prj.projectionType !== prjType;
  }

  ngOnInit(): void {
    if (this.movie) {
      for (const projection of this.movie?.projections) {
        if (
          !this.allProjectionTypes.includes(projection.projectionType) &&
          projection.status !== ProjectionStatus.PROJECTION_ENDED
        ) {
          this.allProjectionTypes.push(projection.projectionType);
        }
      }
    }
  }
}
