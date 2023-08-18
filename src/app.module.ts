import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [UsersModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
