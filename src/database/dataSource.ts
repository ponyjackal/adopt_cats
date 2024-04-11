import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["dist/src/database/entity/*{.ts,.js}"],
  migrations: ["dist/src/database/migration/*{.ts,.js}"],
  connectTimeoutMS: 60000, // 60 seconds,
  logging: true,
});
