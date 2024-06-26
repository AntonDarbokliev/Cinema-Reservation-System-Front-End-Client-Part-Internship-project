import { Hall } from './hall.model';
import { MenuItem } from './menu-item.model';
import { Movie } from './movie.model';

export interface Cinema {
  address: string;

  name: string;

  numberOfHalls: number;

  menu: MenuItem[];

  halls: Hall[];

  movies: Movie[];

  minutesAwaitingStatusMargin?: number;

  _id: string;
}
