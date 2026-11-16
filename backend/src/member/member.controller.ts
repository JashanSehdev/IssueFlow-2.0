import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MemberService } from './member.service.js';
import { UpdateMemberDto } from './dto/update-member.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { AddMemberDto } from './dto/add-member.dto.js';

@Controller('workspace/:wsId/members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  create(@Param('wsId') wsId : StringConstructor ,@Body() addMemberDto: AddMemberDto, @CurrentUser('id') userId : number) {
    return this.memberService.AddMembers(addMemberDto, userId, +wsId);
  }

  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(+id);
  }
}
