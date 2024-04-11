import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCatDto {
  @ApiProperty({
    description: "The name of the cat",
    example: "Whiskers",
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: "The age of the cat in years",
    example: 3,
    type: Number,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly age: number;

  @ApiProperty({
    description: "The breed of the cat",
    example: "Siamese",
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly breed: string;
}
