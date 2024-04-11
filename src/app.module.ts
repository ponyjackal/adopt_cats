import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CatsModule } from "./cats/cats.module";
import { CoreModule } from "./core/core.module";
import { UsersModule } from "./users/users.module";
import { typeOrmAsyncConfig } from "./config/database";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [".env"], isGlobal: true }),
    ConfigModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    CoreModule,
    CatsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
