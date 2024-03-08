import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrate1708545325672 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "corporation_staff_availabilities",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "day",
            type: "smallint",
            isNullable: false,
          },
          {
            name: "startAt",
            type: "smallint",
            isNullable: false,
          },
          {
            name: "lunchStart",
            type: "smallint",
            isNullable: false,
          },
          {
            name: "lunchEnd",
            type: "smallint",
            isNullable: false,
          },
          {
            name: "endsAt",
            type: "smallint",
            isNullable: false,
          },

          {
            name: "corporation_staff_id",
            type: "uuid",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["corporation_staff_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "corporation_staff",
            onDelete: "CASCADE",
          }
        ],
      })
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("corporation_products");
  }
}
