import Player from '../Player/Player';
import Round from './Round';

export default class Tournament {
  description: string;
  beginsAt: Date;
  endsAt: Date;
  rounds: Round[];
  players: Player[];
  id?: string;
  constructor(
    description: string,
    beginsAt: Date,
    endsAt: Date,
    rounds: Round[],
    players: Player[],
    id?: string,
  ) {
    this.description = description;
    this.beginsAt = beginsAt;
    this.endsAt = endsAt;
    this.rounds = rounds;
    this.players = players;
    this.id = id;
  }
}
