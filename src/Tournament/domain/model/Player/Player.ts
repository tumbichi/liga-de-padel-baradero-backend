export default class Player {
  firstname: string;
  lastname: string;
  id: number;
  constructor(firstname: string, lastname: string, id?: number) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.id = id;
  }
}
