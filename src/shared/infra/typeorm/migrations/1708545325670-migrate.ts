import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class Migrate1708545325670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'corporations',
      new TableColumn({
        name: 'profile_photo',
        type: 'varchar',
        isNullable: true,
        isUnique: false
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'corporations',
      new TableColumn({
        name: 'profile_photo',
        type: 'varchar',
        isNullable: true,
        isUnique: false
      })
    )
  }

}
