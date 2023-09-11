export interface IUser {
  id: string;
  createdAt: Date;
  lastActive?: Date;
  username: string;
  email: string;
  //password: string;
  //userRole: UserRole;
}

export interface UserProfile {
  fname: string;
  lname: string;
}

//temporary Roles
export enum UserRole {
  Admin = 'Admin',
  AUser = 'AUser',
  NUser = 'NUser',
}
