import { Injectable } from '@nestjs/common';

@Injectable()
export class ExamService {
  findExamOfUser(userId: string) {
    return 'this is this Exam list of user !';
  }
}
