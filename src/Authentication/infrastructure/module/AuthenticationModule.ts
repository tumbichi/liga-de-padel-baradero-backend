import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import AuthenticationService from 'Authentication/application/service/AuthenticationService';
import UserRepository from 'Authentication/application/repository/UserRepository';

import AuthenticationController from 'Authentication/infrastructure/controller/AuthenticationController';
import UserDataProvider from 'Authentication/infrastructure/dataProvider/UserDataProvider';

import JwtStrategy from 'Authentication/infrastructure/strategy/JwtStrategy';
import LocalStrategy from 'Authentication/infrastructure/strategy/LocalStrategy';
import UserService from 'Authentication/application/service/UserService';

const jwtFactory = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET_KEY'),
    signOptions: {
      expiresIn: configService.get('JWT_EXP_D'),
    },
  }),
  inject: [ConfigService],
};

@Module({
  imports: [JwtModule.registerAsync(jwtFactory), PassportModule],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    LocalStrategy,
    UserService,
    JwtStrategy,
    {
      provide: UserRepository,
      useClass: UserDataProvider,
    },
  ],
  exports: [AuthenticationService, JwtModule, JwtStrategy, PassportModule],
})
export default class UserModule {}
