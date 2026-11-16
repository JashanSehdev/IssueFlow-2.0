import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ProfileSchema1794810611815 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable (
            new Table({
                        name : 'profiles',
                        columns : [
                            {
                                name : 'id',
                                type : 'integer',
                                isPrimary: true,
                                isGenerated : true,
                                generationStrategy: 'increment'
                            },
                            {
                                name : 'userId',
                                type : 'integer',
                                isNullable : false,
                                isUnique : true
                            },
        
                            {
                                name : 'firstName',
                                type : 'varchar',
                                isNullable : false,
                            },
        
                            {
                                name : 'lastName',
                                type : 'varchar',
                                isNullable : false,
                            },

                            {
                                name : 'mobileNumber',
                                type : 'varchar',
                            },
                            {
                                name : 'age',
                                type : 'integer',
                                isNullable : false,
                            },
        
                            {
                                name : 'createdAt',
                                type : 'timestamp',
                                default : 'CURRENT_TIMESTAMP'
                            }, 
        
                            {
                                name : 'updatedAt',
                                type : 'timestamp',
                                default : 'CURRENT_TIMESTAMP'
                            }
                        ],
                        foreignKeys : [
                            {
                                name : 'fk_user_profile',
                                columnNames : ['userId'],
                                referencedColumnNames:['id'],
                                referencedTableName: 'users',
                                onDelete : 'CASCADE'
                            }
                        ]
                    })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('profiles')
    }

}
