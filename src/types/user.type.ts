import { UserAnalyticsEntity } from 'src/entity/user-analytic.entity';
import { ExamRes } from './exam.type';

export interface IUser {
  id: string;
  keyCloakId: string; //add this to table/entity/DTo after connect key cloak
  username: string;
  email: string;
  password: string;
  userRole: UserRole; //add this to table/entity/DTo after connect key cloak
  userProfile?: UserProfile;
}

export interface UserProfile {
  //Add more details Later
  userAnalytic?: UserAnalyticsEntity | null;
  examReses?: ExamRes[] | null;
}
//temporary Roles
export type UserRole = 'Admin' | 'AUser' | 'NUser';
