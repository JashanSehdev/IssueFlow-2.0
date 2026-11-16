import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { BaseService } from '../common/service/base.service.js';
import { Profile } from './entities/profile.entity.js';
import { Repository } from 'typeorm';
import { UserWithProfile } from './interface/profile.interface.js';
import { successResponse } from '../common/utlis/response.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileService extends BaseService<Profile> {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRespository: Repository<Profile>,
  ) {
    super(profileRespository);
  }

  async createProfile(createProfileDto: CreateProfileDto, userId: number) {
    const existedProfile = await this.profileRespository.findOneBy({userId});

    if (existedProfile) throw new ConflictException('User already have a profile')

    const ProfileData = { ...createProfileDto, userId };

    const { id } = await this.create(ProfileData);

    const profile = await this.getProfile(id);

    return successResponse('profile created successfully', profile);
  }

  async getProfile(id: number): Promise<UserWithProfile> {
    const profile = await this.profileRespository.findOne({
      where: {
        id,
      },
      relations: {
        User: true,
      },
    });

    if (!profile) throw new NotFoundException('profile not found');

    return {
      id: profile.userId,
      username: profile.User.username,
      avatar: profile.User.avatar,
      email: profile.User.email,
      role: profile.User.role,
      profile: {
        firstName: profile.firstName,
        lastName: profile.lastName,
        mobileNumber: profile.mobileNumber,
        age: profile.age,
      },
    };
  }

  async editProfile(
    profileId: number,
    updateProfileDto: UpdateProfileDto,
    userId: number,
  ): Promise<UserWithProfile> {
    if (!(await this.isValid(profileId, userId)))
      throw new ForbiddenException('You cannot access this resource');

    const { id } = await this.update(profileId, updateProfileDto);

    return this.getProfile(id);
  }

  async isValid(profileId: number, userId: number): Promise<boolean> {
    const profile = this.profileRespository.findOneBy({
      userId,
      id: profileId,
    });

    return !!profile;
  }
}
