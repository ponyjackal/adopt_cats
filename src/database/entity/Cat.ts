import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Cat {
  @ApiProperty({
    description: "The unique identifier of the cat.",
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "The name of the cat.",
    example: "Whiskers",
  })
  @Column({ nullable: false, unique: true })
  name: string;

  @ApiProperty({
    description: "The age of the cat in years.",
    example: 3,
  })
  @Column({ nullable: false })
  age: number;

  @ApiProperty({
    description: "The breed of the cat.",
    example: "Siamese",
  })
  @Column({ nullable: false })
  breed: string;
}
