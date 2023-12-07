import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTags1701782888627 implements MigrationInterface {
    name = 'CreateTags1701782888627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" ADD "salaz" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "salaz"`);
    }

}
