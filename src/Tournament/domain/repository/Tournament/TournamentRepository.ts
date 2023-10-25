import { Place } from '@prisma/client';
import BaseRepositoryWithPagination from 'Base/repository/BaseRepositoryWithPagination';
import Match from 'Tournament/domain/model/Tournament/Match';
import Score from 'Tournament/domain/model/Tournament/Score';
import Tournament from 'Tournament/domain/model/Tournament/Tournament';

export default abstract class TournamentRepository extends BaseRepositoryWithPagination<
  Tournament,
  string
> {
  abstract createMatch(match: Match, roundId: number): Promise<Match>;
  abstract updateDateAndPlaceToMatch(
    updateMatch: Pick<Match, 'date' | 'place'>,
    matchId: number,
  ): Promise<Match>;

  abstract addScoreToMatch(
    score: Score,
    winner1Id: number,
    winner2Id: number,
    losser1Id: number,
    losser2Id: number,
    matchId: number,
  ): Promise<Match>;
}
