import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserIdIsPrimary1645898219929 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createPrimaryKey("users", ["id"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }
}
