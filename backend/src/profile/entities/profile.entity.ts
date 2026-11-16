import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, type Relation, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/users.entity.js";
@Entity('profiles')
export class Profile {

    @PrimaryGeneratedColumn()
    id : number


    @Column({type : 'integer'})
    userId : number

    @Column({type : 'varchar'})
    firstName : string

    @Column({type : 'varchar'})
    lastName : string

    @Column({type : 'varchar'})
    mobileNumber : string

    @Column({type : 'integer'})
    age : number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(()=>User , (user) => user.Profile)
    @JoinColumn({name: 'userId'})
    User: Relation<User>
}
