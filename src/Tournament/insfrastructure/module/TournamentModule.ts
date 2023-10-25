import { Module } from '@nestjs/common';
import PlayerController from '../controller/Player/PlayerController';
import PlayerService from 'Tournament/application/service/Player/PlayerService';
import PlayerRepository from 'Tournament/domain/repository/Player/PlayerRepository';
import PlayerDataProvider from '../dataProvider/Player/PlayerDataProvider';
import TournamentController from '../controller/Tournament/TournamentController';
import TournamentService from 'Tournament/application/service/Tournament/TournamentService';
import TournamentRepository from 'Tournament/domain/repository/Tournament/TournamentRepository';
import TournamentDataProvidaer from '../dataProvider/Tournament/TournamentDataProvider';

@Module({
  controllers: [PlayerController, TournamentController],
  providers: [
    PlayerService,
    TournamentService,
    { provide: PlayerRepository, useClass: PlayerDataProvider },
    { provide: TournamentRepository, useClass: TournamentDataProvidaer },
  ],
})
export default class TournamentModule {}
