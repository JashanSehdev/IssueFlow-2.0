import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WorkspaceService } from './workspace.service.js';
import { CreateWorkspaceDto } from './dto/create-workspace.dto.js';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { FitlerWorkspaceDto } from './dto/filter-workspace.dto.js';

@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  create(@Body() createWorkspaceDto: CreateWorkspaceDto, @CurrentUser('id') userId : number) {
    return this.workspaceService.createWorkspace(createWorkspaceDto, userId);
  }

  @Get()
  async findAll(@Query() filter : FitlerWorkspaceDto, @CurrentUser('id') userId : number) {
    return await this.workspaceService.getWorkspaces(filter, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser('id') userId : number) {
    return this.workspaceService.findWorkspace(+id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspaceService.update(+id, updateWorkspaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workspaceService.remove(+id);
  }
}
