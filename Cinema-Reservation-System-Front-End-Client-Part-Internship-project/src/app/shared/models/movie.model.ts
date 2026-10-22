import { Genre } from './genre.model';
import { Projection } from './projection.model';
import { Rating } from './rating.model';

export interface Movie {
  name: string;

  rating: Rating;

  genres: Genre[];

  length: string;

  director: string;

  description: string;

  actors: string[];

  language: string;

  poster: string;

  production: Rating;

  subtitles: string[];

  projections: Projection[];

  _id: string;
}
