import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeCatNameUnique1712840762074 implements MigrationInterface {
    name = 'MakeCatNameUnique1712840762074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cat" ADD CONSTRAINT "UQ_aad5842554387ee4ac802df41a8" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cat" DROP CONSTRAINT "UQ_aad5842554387ee4ac802df41a8"`);
    }

}
