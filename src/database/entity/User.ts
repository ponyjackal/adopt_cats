import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import * as bcrypt from "bcrypt";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../common/enums/role.enum";

@Entity()
export class User {
  @ApiProperty({
    description: "The unique identifier of the user.",
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "The username of the user.",
    example: "john_doe",
  })
  @Column({ nullable: false, unique: true })
  username: string;

  // Exclude password from Swagger documentation as it's sensitive information
  @Exclude()
  @Column({ nullable: false })
  password: string;

  @ApiProperty({
    description: "The roles assigned to the user.",
    example: [Role.User, Role.Admin],
    isArray: true,
    enum: Role,
  })
  @Column("enum", { enum: Role, array: true, nullable: false })
  roles: Role[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(
      this.password,
      Number(process.env.HASH_SALT)
    );
  }
}
