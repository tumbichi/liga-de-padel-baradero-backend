import { Place } from '@prisma/client';
import Player from '../Player/Player';
import Score from './Score';

export default class Match {
  couple1: Player[];
  couple2: Player[];
  date?: Date;
  place?: Place;
  winners?: Player[];
  lossers?: Player[];
  score?: Score;
  id: number;
  constructor(
    couple1: Player[],
    couple2: Player[],
    date?: Date,
    place?: Place,
    winners?: Player[],
    lossers?: Player[],
    score?: Score,
    id?: number,
  ) {
    this.date = date;
    this.place = place;
    this.couple1 = couple1;
    this.couple2 = couple2;
    this.winners = winners;
    this.lossers = lossers;
    this.score = score;
    this.id = id;
  }
}
