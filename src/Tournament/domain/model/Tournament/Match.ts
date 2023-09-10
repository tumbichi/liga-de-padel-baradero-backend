import { Place } from '@prisma/client';
import Player from '../Player/Player';
import Score from './Score';

export default class Match {
  players: Player[];
  date?: Date;
  place?: Place;
  winners?: Player[];
  lossers?: Player[];
  score?: Score;
  id: number;
  constructor(
    players: Player[],
    date?: Date,
    place?: Place,
    winners?: Player[],
    lossers?: Player[],
    score?: Score,
    id?: number,
  ) {
    this.date = date;
    this.place = place;
    this.players = players;
    this.winners = winners;
    this.lossers = lossers;
    this.score = score;
    this.id = id;
  }
}
