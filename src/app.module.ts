import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CatsModule } from "./cats/cats.module";
import { CoreModule } from "./core/core.module";
import { UsersModule } from "./users/users.module";
import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        console.log("cn", config.get("database"));
        return config.get("database");
      },
      inject: [ConfigService],
    }),
    CoreModule,
    CatsModule,
    UsersModule,
  ],
})
export class AppModule {}
