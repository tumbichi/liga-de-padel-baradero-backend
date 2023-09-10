import { Injectable } from '@nestjs/common';
import { Place, Prisma } from '@prisma/client';
import PrismaClient from 'Base/config/prisma/PrismaClient';
import Player from 'Tournament/domain/model/Player/Player';
import Match from 'Tournament/domain/model/Tournament/Match';
import Round from 'Tournament/domain/model/Tournament/Round';
import Score from 'Tournament/domain/model/Tournament/Score';
import Set from 'Tournament/domain/model/Tournament/Set';
import Tournament from 'Tournament/domain/model/Tournament/Tournament';
import TournamentRepository from 'Tournament/domain/repository/Tournament/TournamentRepository';

@Injectable()
export default class TournamentDataProvider implements TournamentRepository {
  client: PrismaClient['tournament'];
  matchClient: PrismaClient['match'];

  constructor(prisma: PrismaClient) {
    this.client = prisma.tournament;
    this.matchClient = prisma.match;
  }

  findAndCount(skip: number, take: number): Promise<[Tournament[], number]> {
    throw new Error('Method not implemented.');
  }
  async insert(tournament: Tournament): Promise<Tournament> {
    try {
      const tournamentEntity = await this.client.create({
        data: {
          description: tournament.description,
          beginsAt: tournament.beginsAt,
          endsAt: tournament.endsAt,
          rounds: {
            createMany: {
              data: tournament.rounds.map((round) => ({
                description: round.description,
              })),
            },
          },
          players: {
            connect: tournament.players.map((player) => ({
              id: player.id,
            })),
          },
        },
        include: {
          rounds: true,
          players: true,
        },
      });

      const rounds = tournamentEntity.rounds.map(
        (roundEntity) => new Round(roundEntity.description, [], roundEntity.id),
      );

      const players = tournamentEntity.players.map(
        (playerEntity) =>
          new Player(
            playerEntity.firstname,
            playerEntity.lastname,
            playerEntity.id,
          ),
      );

      return new Tournament(
        tournamentEntity.description,
        tournamentEntity.beginsAt,
        tournamentEntity.endsAt,
        rounds,
        players,
        tournamentEntity.id,
      );
    } catch (error) {
      console.log('PrismaError :>> ', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(error.message);
      }

      throw error;
    }
  }
  async findById(id: string): Promise<Tournament> {
    try {
      const tournamentEntity = await this.client.findUnique({
        where: { id },
        include: {
          rounds: {
            include: {
              matches: {
                include: { players: true, score: { include: { sets: true } } },
              },
            },
          },
          players: true,
        },
      });

      const rounds = tournamentEntity.rounds.map((roundEntity) => {
        const matches = roundEntity.matches.map((matchEntity) => {
          const players = matchEntity.players.map(
            (playerEntity) =>
              new Player(
                playerEntity.firstname,
                playerEntity.lastname,
                playerEntity.id,
              ),
          );
          return new Match(
            players,
            matchEntity.date,
            matchEntity.place,
            undefined,
            undefined,
            matchEntity.score
              ? new Score(
                  matchEntity.score.sets.map(
                    (setEntity) =>
                      new Set(
                        setEntity.gamesTeam1,
                        setEntity.gamesTeam2,
                        setEntity.id,
                      ),
                  ),
                )
              : undefined,
            matchEntity.id,
          );
        });
        return new Round(roundEntity.description, matches, roundEntity.id);
      });

      const players = tournamentEntity.players.map(
        (playerEntity) =>
          new Player(
            playerEntity.firstname,
            playerEntity.lastname,
            playerEntity.id,
          ),
      );

      return new Tournament(
        tournamentEntity.description,
        tournamentEntity.beginsAt,
        tournamentEntity.endsAt,
        rounds,
        players,
        tournamentEntity.id,
      );
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<Tournament[]> {
    try {
      const tournamentsEntity = await this.client.findMany({
        include: {
          rounds: true,
          players: true,
        },
      });

      return tournamentsEntity.map((tournamentEntity) => {
        const rounds = tournamentEntity.rounds.map(
          (roundEntity) =>
            new Round(roundEntity.description, [], roundEntity.id),
        );

        const players = tournamentEntity.players.map(
          (playerEntity) =>
            new Player(
              playerEntity.firstname,
              playerEntity.lastname,
              playerEntity.id,
            ),
        );
        return new Tournament(
          tournamentEntity.description,
          tournamentEntity.beginsAt,
          tournamentEntity.endsAt,
          rounds,
          players,
          tournamentEntity.id,
        );
      });
    } catch (error) {}
  }
  delete(id: string): Promise<Tournament> {
    throw new Error('Method not implemented.');
  }
  update(id: string, entity: Partial<Tournament>): Promise<Tournament> {
    throw new Error('Method not implemented.');
  }

  async createMatch(match: Match, roundId: number) {
    try {
      const matchEntity = await this.matchClient.create({
        data: {
          players: {
            connect: match.players.map((player) => ({ id: player.id })),
          },
          round: { connect: { id: roundId } },
        },
        include: {
          players: true,
        },
      });

      const players = matchEntity.players.map(
        (playerEntity) =>
          new Player(
            playerEntity.firstname,
            playerEntity.lastname,
            playerEntity.id,
          ),
      );

      return new Match(
        players,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        matchEntity.id,
      );
    } catch (error) {
      console.log('error :>> ', error);
      throw error;
    }
  }
  async updateDateAndPlaceToMatch(
    updateMatch: Required<Pick<Match, 'date' | 'place'>>,
    matchId: number,
  ): Promise<Match> {
    try {
      const matchEntity = await this.matchClient.update({
        data: { date: updateMatch.date, place: updateMatch.place },
        where: {
          id: matchId,
        },
      });

      return new Match(
        [],
        matchEntity.date,
        matchEntity.place,
        undefined,
        undefined,
        undefined,
        matchEntity.id,
      );
    } catch (error) {
      console.log('error :>> ', error);
      throw error;
    }
  }

  async addScoreToMatch(
    score: Score,
    winner1Id: number,
    winner2Id: number,
    losser1Id: number,
    losser2Id: number,
    matchId: number,
  ): Promise<Match> {
    try {
      const matchEntity = await this.matchClient.update({
        data: {
          winners: { connect: [{ id: winner1Id }, { id: winner2Id }] },
          losers: { connect: [{ id: losser1Id }, { id: losser2Id }] },
          score: {
            create: {
              sets: {
                createMany: {
                  data: score.sets.map((set) => ({
                    gamesTeam1: set.gamesTeam1,
                    gamesTeam2: set.gamesTeam2,
                  })),
                },
              },
            },
          },
        },
        where: { id: matchId },
        include: {
          score: { include: { sets: true } },
          winners: true,
          losers: true,
        },
      });

      return new Match(
        [],
        undefined,
        undefined,
        matchEntity.winners.map(
          (playerEntity) =>
            new Player(playerEntity.firstname, playerEntity.lastname),
        ),
        matchEntity.losers.map(
          (playerEntity) =>
            new Player(playerEntity.firstname, playerEntity.lastname),
        ),
        new Score(
          matchEntity.score.sets.map(
            (setEntity) =>
              new Set(setEntity.gamesTeam1, setEntity.gamesTeam2, setEntity.id),
          ),
        ),
        matchEntity.id,
      );
    } catch (error) {}
  }
}
