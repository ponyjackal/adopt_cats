import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { AccessTokenStrategy } from "../common/guards/access-token.strategy";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  controllers: [AuthController, AccessTokenStrategy],
  providers: [AuthService],
})
export class AuthModule {}
