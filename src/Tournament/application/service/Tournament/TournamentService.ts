import { Injectable } from '@nestjs/common';
import { Place } from '@prisma/client';
import AddScoreToMatchDto from 'Tournament/application/dto/AddScoreToMatchDto';
import CreateTournamentDto from 'Tournament/application/dto/CreateTournamentDto';
import TournamentDoesntExistsException from 'Tournament/application/exception/TournamentDoesntExistsException';
import Player from 'Tournament/domain/model/Player/Player';
import Match from 'Tournament/domain/model/Tournament/Match';
import Round from 'Tournament/domain/model/Tournament/Round';
import Score from 'Tournament/domain/model/Tournament/Score';
import Set from 'Tournament/domain/model/Tournament/Set';
import Tournament from 'Tournament/domain/model/Tournament/Tournament';

import TournamentRepository from 'Tournament/domain/repository/Tournament/TournamentRepository';

@Injectable()
export default class TournamentService {
  constructor(private readonly repository: TournamentRepository) {}

  async createTournament(
    tournamentDto: CreateTournamentDto,
  ): Promise<Tournament> {
    const rounds = [...new Array(tournamentDto.countOfRounds)].map(
      (_, index) => new Round('Ronda ' + String(index + 1)),
    );

    console.log('rounds :>> ', rounds);

    const players = tournamentDto.playerIds.map(
      (playerId) => new Player('', '', playerId),
    );

    const tournament = new Tournament(
      tournamentDto.description,
      new Date(tournamentDto.beginsAt),
      new Date(tournamentDto.endsAt),
      rounds,
      players,
    );

    const tournamentCreated = await this.repository.insert(tournament);
    return tournamentCreated;
  }

  async findTournamentById(tournamentId: string): Promise<Tournament> {
    const tournament = await this.repository.findById(tournamentId);

    if (tournament === null) {
      throw new TournamentDoesntExistsException();
    }

    return tournament;
  }

  async findAllTournaments(): Promise<Tournament[]> {
    const tournaments = await this.repository.findAll();

    return tournaments;
  }

  async createMatch(playerIds: number[], roundId: number): Promise<Match> {
    const players = playerIds.map((playerId) => new Player('', '', playerId));
    const matchCreated = await this.repository.createMatch(
      new Match(players),
      roundId,
    );

    return matchCreated;
  }

  async updateDateAndPlaceToMatch(
    { date, place }: UpdateDateAndPlaceDto,
    matchId: number,
  ): Promise<Match> {
    return await this.repository.updateDateAndPlaceToMatch(
      { date, place },
      matchId,
    );
  }

  async addScoreToMatch(scoreDto: AddScoreToMatchDto, matchId: number) {
    const score = new Score(
      scoreDto.sets.map(
        (setDto) => new Set(setDto.gamesTeam1, setDto.gamesTeam2),
      ),
    );

    return await this.repository.addScoreToMatch(
      score,
      scoreDto.winners[0],
      scoreDto.winners[1],
      scoreDto.lossers[0],
      scoreDto.lossers[1],
      matchId,
    );
  }
}

interface UpdateDateAndPlaceDto {
  date: Date;
  place: Place;
}
