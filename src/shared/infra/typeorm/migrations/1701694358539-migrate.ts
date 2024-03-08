import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm"

export class Migrate1701694358539 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "persons",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'first_name',
                        type: 'varchar',
                    },
                    {
                        name: 'last_name',
                        type: 'varchar',
                    },
                    {
                        name: 'phone_number',
                        type: 'varchar',
                    },
                    {
                        name: 'instagram',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'avatar',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                    },
                    {
                        name: 'deletedAt',
                        type: 'timestamp',
                        isNullable: true
                    },
                ]
            })
        )

        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                    },
                    {
                        name: 'deletedAt',
                        type: 'timestamp',
                        isNullable: true
                    },
                    {
                        name: 'person_id',
                        type: 'uuid',
                        isNullable: true
                    },
                ],
                foreignKeys: [{
                    columnNames: ['person_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'persons',
                    onDelete: 'Cascade'
                }]
            })
        )

        await queryRunner.createTable(
            new Table({
                name: "roles",
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    }
                ]
            })
        )

        await queryRunner.createTable(
            new Table({
                name: "user_roles",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'role_id',
                        type: 'int',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                    }
                ],
                foreignKeys: [{
                    columnNames: ['user_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'users',
                    onDelete: 'Cascade'
                },
                {
                    columnNames: ['role_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'roles',
                    onDelete: 'Cascade'
                }]
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
