import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCatTable1712798921430 implements MigrationInterface {
  name = "CreateCatTable1712798921430";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cat" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, "breed" character varying NOT NULL, CONSTRAINT "PK_7704d5c2c0250e4256935ae31b4" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "cat"`);
  }
}
