import Match from './Match';

export default class Round {
  description: string;
  matches?: Match[];
  id?: number;
  constructor(description: string, matches?: Match[], id?: number) {
    this.description = description;
    this.matches = matches;
    this.id = id;
  }
}
