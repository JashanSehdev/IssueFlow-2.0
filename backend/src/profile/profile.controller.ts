import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param
} from '@nestjs/common';
import { ProfileService } from './profile.service.js';
import { CreateProfileDto } from './dto/create-profile.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';

@Controller('users/:userId/profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  @Post()
  create(
    @Param('userId') userId: number,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.profileService.createProfile(createProfileDto, +userId);
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.getProfile(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto, @CurrentUser('id') userId : number) {

    return this.profileService.editProfile(+id, updateProfileDto, userId);
  }

}
