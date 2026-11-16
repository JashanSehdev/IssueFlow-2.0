import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
} from 'typeorm';
import { WorkspaceRole } from '../enum/role.enum.js';
import { User } from '../../users/entities/users.entity.js';
import { Workspace } from '../../workspace/entities/workspace.entity.js';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  userId: number;

  @Column({ type: 'integer' })
  workspaceId: number;

  @Column({ type: 'enum', enum: WorkspaceRole })
  role: WorkspaceRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.Workspaces)
  @JoinColumn({ name: 'userId' })
  Member: Relation<User>;

  @ManyToOne(() => Workspace, (ws) => ws.Members)
  @JoinColumn({ name: 'workspaceId' })
  Workspace: Relation<Workspace[]>;
}
