import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class MemberSchema1794814387723 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'members',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'userId',
            type: 'integer',
            isNullable: false,
          },

          {
            name: 'workspaceId',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'enum',
            enum: ['administrator', 'member'],
            default: "'member'",
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_Member',
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
          },
          {
            name: 'fk_workspace',
            columnNames: ['workspaceId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'workspaces',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('members')
  }
}
