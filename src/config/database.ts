import { ConfigService } from "@nestjs/config";
import {
  TypeOrmModuleOptions,
  TypeOrmModuleAsyncOptions,
} from "@nestjs/typeorm";
import { DataSource } from "typeorm";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const config: ConfigService = new ConfigService();

const dbConfig = {
  type: "postgres" as const,
  host: config.get<string>("DB_HOST"),
  port: config.get<number>("DB_PORT"),
  database: config.get<string>("DB_NAME"),
  username: config.get<string>("DB_USER"),
  password: config.get<string>("DB_PASSWORD"),
  entities: ["dist/database/entity/*.{ts,js}"],
  migrations: ["dist/database/migration/*.{ts,js}"],
  migrationsRun: true,
  migrationsTableName: "typeorm_migrations",
  synchronize: false,
  ssl: config.get("SSL_MODE", false),
  extra: {
    ssl:
      config.get("SSL_MODE", false) == "true"
        ? {
            rejectUnauthorized: !config.get<boolean>("SSL_MODE", false),
          }
        : null,
  },
  cli: {
    migrationsDir: "src/migrations",
  },
  logging: true,
};

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return dbConfig;
  },
};
export default new DataSource(dbConfig);
