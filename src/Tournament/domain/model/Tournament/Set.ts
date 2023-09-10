export default class Set {
  gamesTeam1: number;
  gamesTeam2: number;
  id: number;
  constructor(gamesTeam1: number, gamesTeam2: number, id?: number) {
    this.gamesTeam1 = gamesTeam1;
    this.gamesTeam2 = gamesTeam2;
    this.id = id;
  }
}
