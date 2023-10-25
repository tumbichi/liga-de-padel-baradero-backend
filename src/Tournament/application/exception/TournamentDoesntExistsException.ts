export default class TournamentDoesntExistsException extends Error {
  constructor(message = 'AuthErrors.TOURNAMENT_DOSENT_EXIST') {
    super(message);
    this.name = 'TournamentDoesntExistsException';
  }
}
