import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ExamModule } from './modules/exam/exam.module';
import { UserEntity } from './entity/user.entity';
import { ExamEntity } from './entity/exam.entity';
import { ExamProgressEntity } from './entity/exam-progress.entity';
import { QuestionEntity } from './entity/question.entity';
import { UserAnalyticsEntity } from './entity/user-analytic.entity';
import { UserAnalyticModule } from './modules/user-analytic/user-analytic.module';
import { UserChoiceEntity } from './entity/user-choice.entity';
import { ExamDetailsEntity } from './entity/exam-details.entity';

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
            UserAnalyticsEntity,
            ExamProgressEntity,
            ExamDetailsEntity,
            ExamEntity,
            QuestionEntity,
            UserChoiceEntity,
          ],
        };
      },
      inject: [ConfigService],
    }),
    //Main modules
    UserModule,
    ExamModule,
    UserAnalyticModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
