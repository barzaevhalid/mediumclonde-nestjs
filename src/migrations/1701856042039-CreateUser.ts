import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1701856042039 implements MigrationInterface {
    name = 'CreateUser1701856042039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "bio" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "salaz"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" ADD "salaz" boolean NOT NULL`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
