import { Module } from '@nestjs/common';

import PrismaModule from 'Base/config/prisma/PrismaModule';
import AuthenticationModule from 'Authentication/infrastructure/module/AuthenticationModule';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    AuthenticationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
