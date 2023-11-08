import { IsString } from 'class-validator';

export class UpdateUserProfileDto {
  @IsString()
  bio: string;

  @IsString()
  fname: string;

  @IsString()
  lname: string;

  @IsString()
  image: string;

  @IsString()
  displayName: string;
}
