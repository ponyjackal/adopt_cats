import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRolesToUserTable1712840068153 implements MigrationInterface {
    name = 'AddRolesToUserTable1712840068153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_roles_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "roles" "public"."user_roles_enum" array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roles"`);
        await queryRunner.query(`DROP TYPE "public"."user_roles_enum"`);
    }

}
