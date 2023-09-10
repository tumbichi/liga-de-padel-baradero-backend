import Set from './Set';

export default class Score {
  sets: Set[];
  id: number;
  constructor(sets: Set[], id?: number) {
    this.sets = sets;
    this.id = id;
  }
}
