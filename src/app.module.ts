import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExamProgressModule } from './modules/exam-progress/exam-progress.module';
import { UserModule } from './modules/user/user.module';
import { ExamGenerateModule } from './modules/exam-generate/exam-generate.module';

@Module({
  imports: [UserModule, ExamProgressModule, ExamGenerateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
