import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import * as bcrypt from "bcrypt";
import { Exclude } from "class-transformer";

import { Role } from "../../common/enums/role.enum";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

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
