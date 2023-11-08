import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfileEntity } from '../entity/user-profile.entity';
import { CreateUserProfileDto } from '../dto/create-user-profile.dto';
import { UserProfile } from '../interface/user-profile.interface';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';

export class UserProfileDal {
  constructor(
    @InjectRepository(UserProfileEntity)
    private readonly userProfileRepo: Repository<UserProfileEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async userCreateUserProfile(
    userId: string,
    createUserProfileDto: CreateUserProfileDto,
  ): Promise<UserProfile> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      select: ['id', 'username', 'email'],
    });
    if (!user) {
      throw new NotFoundException(`User with id: ${userId} not found`);
    }

    if (user.userProfile) {
      throw new ConflictException(
        `User with id: ${userId} already has a Profile`,
      );
    }

    const userProfile = this.userProfileRepo.create({
      user,
      ...createUserProfileDto,
    });

    const saveUserProfile = await this.userProfileRepo.save(userProfile);

    return saveUserProfile;
  }

  async getAllUserProfile(): Promise<UserProfile[]> {
    const userProfiles = await this.userProfileRepo.find({
      order: {
        createdAt: 'ASC',
      },
    });

    if (userProfiles.length === 0) {
      throw new NotFoundException(`User profile not found`);
    }

    const profiles: UserProfile[] = userProfiles.map((profile) => {
      const { ...profileData }: UserProfile = profile;
      return profileData;
    });

    return profiles;
  }

  async getUserProfileById(id: string): Promise<UserProfile | null> {
    const userProfile = await this.userProfileRepo.findOne({
      where: { id },
    });

    if (!userProfile) {
      throw new NotFoundException(`UserProfile's id: ${id} not found`);
    }

    return userProfile;
  }

  async updateUserProfileById(
    id: string,
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    const userProfile = await this.userProfileRepo.findOne({
      where: { id },
    });

    if (!userProfile) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    const result = await this.userProfileRepo.save({
      id,
      ...updateUserProfileDto,
    });

    return result as UserProfile;
  }

  async deleteUserProfileById(id: string): Promise<boolean> {
    const userProfile = await this.userProfileRepo.findOne({
      where: { id },
    });

    if (!userProfile) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    const result = await this.userProfileRepo.delete({ id });

    if (result.affected === 0) {
      return false;
    }
    return true;
  }
}
