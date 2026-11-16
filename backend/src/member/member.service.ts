import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { BaseService } from '../common/service/base.service.js';
import { Member } from './entities/member.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { WorkspaceRole } from './enum/role.enum.js';
import { AddMemberDto } from './dto/add-member.dto.js';

@Injectable()
export class MemberService extends BaseService<Member> {
    constructor(
        @InjectRepository(Member)
        private readonly memberRepository : Repository<Member>,
        private readonly datasource : DataSource
    ) {
        super(memberRepository)
    }


    async AddMembers (addMembersDto : AddMemberDto , userId : number, wsId : number) {
        
        const member = await this.memberRepository.findOneBy({userId});
        if (!member) throw new ForbiddenException('You cannot access this resource');

        if (member.role !== WorkspaceRole.ADMIN)  throw new ForbiddenException('You cannot add members');

        await this.datasource.transaction(async(manager : EntityManager) => {
            const memberRepo = manager.getRepository(Member);

            for(const member of addMembersDto.members){
                const exisiting_member = await memberRepo.findOneBy({
                    userId : member, id : wsId
                })

                if(exisiting_member)  throw new ConflictException('One of the member already exisit');

                const createdMember = memberRepo.create({workspaceId : wsId, userId : member});

                await memberRepo.save(createdMember);
            }
        })

        return {
            success : true,
            message : "member successfully added"
        }
    } 
}
