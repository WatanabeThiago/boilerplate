import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrate1708545325671 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "corporation_products",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "product_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "corporation_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "price",
            type: "int",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["corporation_id"],
            referencedTableName: "corporations",
            referencedColumnNames: ["id"],
            name: "fk_corporation_products_corporation", // Nome da FK para corporation_id
          },
          {
            columnNames: ["product_id"],
            referencedTableName: "products",
            referencedColumnNames: ["id"],
            name: "fk_corporation_products_product", // Nome da FK para product_id
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("corporation_products");
  }
}
