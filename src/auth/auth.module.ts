import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.jwt_secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, UserService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
