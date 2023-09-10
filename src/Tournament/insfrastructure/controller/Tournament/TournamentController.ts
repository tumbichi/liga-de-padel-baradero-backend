import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';

import { ZodValidationPipe } from 'Base/pipe/ZodValidationPipe';
import JwtAuthGuard from 'Authentication/infrastructure/guards/JwtAuthGuard';

import TournamentService from 'Tournament/application/service/Tournament/TournamentService';
import Tournament from 'Tournament/domain/model/Tournament/Tournament';
import CreateTournamentDto from 'Tournament/application/dto/CreateTournamentDto';
import CreateTournamentSchema from 'Tournament/application/schema/CreateTournamentSchema';
import Match from 'Tournament/domain/model/Tournament/Match';
import CreateMatchDto from 'Tournament/application/dto/CreateMatchDto';
import CreateMatchSchema from 'Tournament/application/schema/CreateMatchSchema';
import UpdateDateAndPlaceSchema from 'Tournament/application/schema/UpdateDateAndPlaceSchema';
import UpdateDateAndPlaceDto from 'Tournament/application/dto/UpdateDateAndPlaceDto';
import AddScoreToMatchSchema from 'Tournament/application/schema/AddScoreToMatchSchema';
import AddScoreToMatchDto from 'Tournament/application/dto/AddScoreToMatchDto';

@Controller('tournament')
export default class TournamentController {
  constructor(private tournamentService: TournamentService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(CreateTournamentSchema))
  @Post('create')
  async createTournament(
    @Body() createTournamentDto: CreateTournamentDto,
  ): Promise<Tournament> {
    return this.tournamentService
      .createTournament(createTournamentDto)
      .then((tournamentCreated) => tournamentCreated)
      .catch((error) => {
        console.log('error :>> ', error);
        switch (error.name) {
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getTournamentById(
    @Param('id') tournamentId: string,
  ): Promise<Tournament> {
    return this.tournamentService
      .findTournamentById(tournamentId)
      .then((person) => person)
      .catch((error) => {
        switch (error.name) {
          case 'TournamentDoesntExistsException':
            throw new HttpException(error.message, 404);
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAll(): Promise<Tournament[]> {
    return await this.tournamentService.findAllTournaments();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(CreateMatchSchema))
  @Post('/match/create')
  async createMatch(@Body() createMatchDto: CreateMatchDto): Promise<Match> {
    return await this.tournamentService.createMatch(
      createMatchDto.playersIds,
      createMatchDto.roundId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(UpdateDateAndPlaceSchema))
  @Patch('/match/update-date-and-place/:id')
  async updateDateAndPlaceToMatch(
    @Body() updateDateAndPlaceDto: UpdateDateAndPlaceDto,
    @Param('id') matchId: string,
  ) {
    return await this.tournamentService.updateDateAndPlaceToMatch(
      {
        date: new Date(updateDateAndPlaceDto.date),
        place: updateDateAndPlaceDto.place,
      },
      parseInt(matchId, 10),
    );
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(AddScoreToMatchSchema))
  @Patch('/match/add-score/:id')
  async addScoreToMatch(
    @Body() addScoreToMatchDto: AddScoreToMatchDto,
    @Param('id') matchId: string,
  ) {
    return await this.tournamentService.addScoreToMatch(
      addScoreToMatchDto,
      parseInt(matchId, 10),
    );
  }
}
