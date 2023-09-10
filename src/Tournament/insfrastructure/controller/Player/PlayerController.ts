import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';

import PaginationMetaDto from 'Base/dto/PaginationMetaDto';

import JwtAuthGuard from 'Authentication/infrastructure/guards/JwtAuthGuard';

import PlayerService from 'Tournament/application/service/Player/PlayerService';
import Player from 'Tournament/domain/model/Player/Player';
import { ZodValidationPipe } from 'Base/pipe/ZodValidationPipe';
import CreatePlayerDto from 'Tournament/application/dto/CreatePlayerDto';
import CreatePlayerSchema from 'Tournament/application/schema/CreatePlayerSchema';

@Controller('player')
export default class PlayerController {
  constructor(private playerService: PlayerService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(CreatePlayerSchema))
  @Post('create')
  async createPlayer(
    @Body() createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    return this.playerService
      .createPlayer(createPlayerDto)
      .then((playerCreated) => playerCreated)
      .catch((error) => {
        switch (error.name) {
          case 'DniAlreadyInUseException':
          case 'EmailAlreadyInUseException': {
            throw new HttpException(error.message, 400);
          }
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('/pagination')
  async getAllPagination(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ): Promise<{ data: Player[]; meta: PaginationMetaDto }> {
    const [players, paginationMeta] = await this.playerService.getAllPagination(
      +page,
      +limit,
    );

    return { data: players, meta: paginationMeta };
  }
}
