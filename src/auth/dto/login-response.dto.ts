import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {
  @ApiProperty({
    description: "JWT access token for authenticated requests",
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJzdWIiOjEsImlhdCI6MTYxMjM5OTIyMiwiZXhwIjoxNjEyNDg1NjIyfQ.S5P0gam_ELKjCiI2h_upY4lJ5givCHZbOZZaXMp3yJA",
  })
  readonly access_token: string;
}
