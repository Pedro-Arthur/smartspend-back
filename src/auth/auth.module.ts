import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CodesModule } from 'src/codes/codes.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from 'src/constants/jwt.constants';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    DatabaseModule,
    CodesModule,
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.validityTime },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
