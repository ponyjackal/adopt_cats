import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateCatDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly age: number;

  @IsNotEmpty()
  @IsString()
  readonly breed: string;
}
