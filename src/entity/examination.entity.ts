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
import { QuestionSheetEntity } from './question-sheet.entity';
import { UserEntity } from './user.entity';

@Entity({ name: Database.Table.Examination })
export class ExaminationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;

  @Column()
  totalTime: number;

  @Column()
  examType: ExamType;

  @Column()
  questionTypes: QuestionType;

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

  @Column({ nullable: true }) // Nullable because it's optional in the interface
  amount?: number;

  @ManyToOne(() => UserEntity, (user) => user.examination)
  user?: UserEntity;

  @OneToMany(
    () => QuestionSheetEntity,
    (questionsheet) => questionsheet.examination,
  )
  questionSheet: QuestionSheetEntity[];
}
