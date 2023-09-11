import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class UpdateUsernameDto {
  @IsString()
  @IsNotEmpty()
  username?: string;
}

export class GetUserInFoDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class UpdateLastActiveDto {
  @IsOptional()
  lastActive: Date;
}
