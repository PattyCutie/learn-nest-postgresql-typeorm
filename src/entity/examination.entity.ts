import { Database } from 'src/config/db.config';
import {
  ExamType,
  Level,
  Part,
  QuestionType,
  Section,
  SubjectVal,
  Topic,
} from 'src/types/exam.type';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnswerSheetEntity } from './answer-sheet.entity';
import { UserEntity } from './user.entity';

@Entity({ name: Database.Table.Examination })
export class ExaminationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  examId: string;

  @Column()
  totalTime: number;

  @Column()
  examType: ExamType;

  @Column()
  questionType: QuestionType;

  @Column()
  subjectVal: SubjectVal;

  @Column()
  section: Section;

  @Column()
  part: Part;

  @Column()
  topic: Topic;

  @Column()
  level: Level;

  @Column({ nullable: true })
  duration?: number;

  @Column({ nullable: true })
  amount?: number;

  @ManyToOne(() => UserEntity, (user) => user.examination)
  user?: UserEntity;

  @OneToMany(
    () => AnswerSheetEntity,
    (questionsheet) => questionsheet.examination,
  )
  @JoinColumn({ name: 'examId' })
  answerSheet: AnswerSheetEntity[];
}
