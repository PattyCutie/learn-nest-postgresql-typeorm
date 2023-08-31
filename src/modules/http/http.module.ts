import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ExamHttpService } from './http.sevice';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [ExamHttpService],
  exports: [ExamHttpService],
})
export class HttpServiceModule {}
