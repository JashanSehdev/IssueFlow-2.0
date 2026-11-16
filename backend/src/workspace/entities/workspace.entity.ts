import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
  VirtualColumn,
} from 'typeorm';
import { User } from '../../users/entities/users.entity.js';
import { Member } from '../../member/entities/member.entity.js';

@Entity('workspaces')
export class Workspace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'integer' })
  ownerId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VirtualColumn({
    query : (alias) => `SELECT COUNT(*) FROM members where "workspaceId" = ${alias}.id`
  })
  total_members : number

  @ManyToOne(() => User, (user) => user.CreatedWorkspaces)
  @JoinColumn({ name: 'ownerId' })
  Owner: Relation<User>;

  @OneToMany(() => Member, (member) => member.Workspace)
  Members: Relation<Member[]>;
}
