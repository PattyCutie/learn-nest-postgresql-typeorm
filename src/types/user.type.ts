export interface IUser {
  id: string;
  createdAt: Date;
  username: string;
  email: string;
  password: string;
  userRole: UserRole;
}

export interface UserProfile {
  userId: string;
  fname: string;
  lname: string;
}

//temporary Roles
export enum UserRole {
  Admin = 'Admin',
  AUser = 'AUser',
  NUser = 'NUser',
}
