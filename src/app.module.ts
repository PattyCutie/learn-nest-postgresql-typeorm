import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ExamModule } from './modules/exam/exam.module';
import { UserEntity } from './entity/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ExamProgressModule } from './modules/exam-progress/exam-progress.module';
import { ExaminationModule } from './modules/examination/examination.module';
import { QuestionEntity } from './entity/question.entity';
import { ExamEntity } from './entity/exam.entity';
import { AnswerSheetEntity } from './entity/answer-sheet.entity';
import { ExaminationEntity } from './entity/examination.entity';
import { ExamProgressEntity } from './entity/exam-progress.entity';
import { QuestionProgressEntity } from './entity/question-progress.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('NODE_ENV') === 'production';
        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_DB_PORT'),
          database: configService.get('POSTGRES_DB'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          synchronize: true,
          logging: !isProduction,
          entities: [
            UserEntity,
            ExamEntity,
            QuestionEntity,
            ExaminationEntity,
            AnswerSheetEntity,
            ExamProgressEntity,
            QuestionProgressEntity,
          ],
        };
      },
      inject: [ConfigService],
    }),
    //Main modules
    AuthModule,
    UserModule,
    ExamModule,
    ExamProgressModule,
    ExaminationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
