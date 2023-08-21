import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    CommentModule,
    TypeOrmModule.forRoot(config),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
