import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
  findUserComments(userId: string) {
    return 'this is comment of the user !';
  }
}
