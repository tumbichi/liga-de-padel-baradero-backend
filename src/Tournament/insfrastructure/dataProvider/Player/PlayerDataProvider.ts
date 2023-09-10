import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import DniAlreadyInUseException from 'Authentication/application/exception/DniAlreadyInUseException';
import EmailAlreadyInUseException from 'Authentication/application/exception/EmailAlreadyInUseException';
import PrismaClient from 'Base/config/prisma/PrismaClient';
import Player from 'Tournament/domain/model/Player/Player';
import PlayerRepository from 'Tournament/domain/repository/Player/PlayerRepository';

@Injectable()
export default class PlayerDataProvider implements PlayerRepository {
  client: PrismaClient['player'];

  constructor(prisma: PrismaClient) {
    this.client = prisma.player;
  }
  async findAndCount(skip: number, take: number): Promise<[Player[], number]> {
    try {
      const playersEntity = await this.client.findMany({
        skip,
        take,
      });

      const count = await this.client.count();

      return [
        playersEntity.map(
          (playerEntity) =>
            new Player(playerEntity.firstname, playerEntity.lastname),
        ),
        count,
      ];
    } catch (error) {
      throw error;
    }
  }
  async insert(player: Player): Promise<Player> {
    try {
      const playerEntity = await this.client.create({
        data: { firstname: player.firstname, lastname: player.lastname },
      });
      return new Player(playerEntity.firstname, playerEntity.lastname);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw error.meta.target === 'Person_documentNumber_key'
            ? new DniAlreadyInUseException()
            : new EmailAlreadyInUseException();
        }
        throw new Error(error.message);
      }
      throw new Error('Unkwown error');
    }
  }
  findById(id: number): Promise<Player> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Player[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<Player> {
    throw new Error('Method not implemented.');
  }
  update(id: number, entity: Partial<Player>): Promise<Player> {
    throw new Error('Method not implemented.');
  }
}
