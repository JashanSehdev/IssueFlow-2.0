import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto.js';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto.js';
import { BaseService } from '../common/service/base.service.js';
import { Workspace } from './entities/workspace.entity.js';
import { DataSource, EntityManager, FindOptionsOrder, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../member/entities/member.entity.js';
import { successResponse } from '../common/utlis/response.js';
import { FitlerWorkspaceDto } from './dto/filter-workspace.dto.js';
import { paginationResponse } from '../common/utlis/pagination.js';

@Injectable()
export class WorkspaceService extends BaseService<Workspace> {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    private readonly datasource: DataSource,
  ) {
    super(workspaceRepository);
  }

  async createWorkspace(
    createWorkspaceDto: CreateWorkspaceDto,
    userId: number,
  ) {
    const workspace = await this.datasource.transaction(
      async (manager: EntityManager) => {
        const wsRep = manager.getRepository(Workspace);
        const memberRep = manager.getRepository(Member);

        const ws = wsRep.create({ ...createWorkspaceDto, ownerId: userId });
        const savedWs = await wsRep.save(ws);

        const member = memberRep.create({ userId, workspaceId: savedWs.id });

        await memberRep.save(member);

        return savedWs
      },
    );

    return successResponse("workspace created successfully", await this.getWorkspace(workspace.id))
  }

  async getWorkspace(id: number) {
    const ws = await this.workspaceRepository.findOne({
      where: {
        id,
      },
      relations: {
        Owner: true,
      },
      select: {
        Owner: {
          id: true,
          username: true,
        },
      },
    });

    if (!ws) throw new NotFoundException('workspace not found');

    return {
      id: ws.id,
      title: ws.title,
      description: ws.description,
      member_count : ws.total_members,
      Owner: {
        id: ws.Owner.id,
        username: ws.Owner.username,
      },
    };
  }

  async getWorkspaces(fitlerWorkspaceDto : FitlerWorkspaceDto, userId : number) {
    const ALLOWED_SORT_COLUMNS: (keyof Workspace)[] = ['id', 'title', 'createdAt', 'updatedAt'];
    const {page, limit, search, sortBy = 'createdAt', orderBy} = fitlerWorkspaceDto
    const skip = ((page - 1) * limit);

    const where : FindOptionsWhere<Workspace> = {}
    const order : FindOptionsOrder<Workspace> = {}

    if (search){
      where.title = ILike(`%${search}%`)
    }

    if (sortBy && sortBy in ALLOWED_SORT_COLUMNS){
      order[sortBy as keyof Workspace] = orderBy ? orderBy : 'asc'
    }


    const [wss, total] = await this.workspaceRepository.findAndCount({
      where : {
        Members : {
          userId
        },
        ...where
      },
       relations: {
        Owner: true,
      },
      select: {
        Owner: {
          id: true,
          username: true,
        },
      },

      skip,
      take : limit
    })

    const formattedWs = wss.map((ws) => {
      return {
      id: ws.id,
      title: ws.title,
      description: ws.description,
      member_count : ws.total_members,
      Owner: {
        id: ws.Owner.id,
        username: ws.Owner.username,
      },
    };
    })

    return paginationResponse(formattedWs, page, limit, total)
  }

  async findWorkspace(id : number, userId : number) {
    const isValid = await this.validMember(id, userId);

    if (!isValid) throw new ForbiddenException('you cannot access this resource');

    return  successResponse("Workspace return successfully",await this.getWorkspace(id))
  }

  async validMember (wsId : number, userId: number){
    const ws = await this.workspaceRepository.findOne({
      where : {
        id : wsId,
        Members : {
          userId
        },
      }
    })

    return !!ws
  }
}
