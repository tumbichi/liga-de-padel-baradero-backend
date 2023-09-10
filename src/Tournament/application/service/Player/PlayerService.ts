import { Injectable } from '@nestjs/common';
import PaginationMetaDto from 'Base/dto/PaginationMetaDto';
import CreatePlayerDto from 'Tournament/application/dto/CreatePlayerDto';
import Player from 'Tournament/domain/model/Player/Player';

import PlayerRepository from 'Tournament/domain/repository/Player/PlayerRepository';

@Injectable()
export default class PlayerService {
  constructor(private readonly repository: PlayerRepository) {}

  async createPlayer(playerDto: CreatePlayerDto): Promise<Player> {
    const player = new Player(playerDto.firstname, playerDto.lastname);

    const playerCreated = await this.repository.insert(player);
    return playerCreated;
  }

  async getAllPagination(
    page: number,
    limit: number,
  ): Promise<[Player[], PaginationMetaDto]> {
    const [players, totalItems] = await this.repository.findAndCount(
      (page - 1) * limit,
      limit,
    );

    const totalPages = Math.ceil(totalItems / limit);
    const itemCount = players.length;

    const paginationMeta: PaginationMetaDto = {
      totalItems,
      itemCount,
      itemsPerPage: limit,
      totalPages,
      currentPage: page,
    };

    return [players, paginationMeta];
  }
}
