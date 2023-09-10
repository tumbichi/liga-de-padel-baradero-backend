import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import PrismaModule from 'Base/config/prisma/PrismaModule';
import AuthenticationModule from 'Authentication/infrastructure/module/AuthenticationModule';
import { ConfigModule } from '@nestjs/config';
import { AppLoggerMiddleware } from 'Base/middlewares/HttpLoggerMiddleware';
import TournamentModule from 'Tournament/insfrastructure/module/TournamentModule';

@Module({
  imports: [
    PrismaModule,
    AuthenticationModule,
    TournamentModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
