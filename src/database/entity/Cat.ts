import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  age: number;

  @Column({ nullable: false })
  breed: string;
}
