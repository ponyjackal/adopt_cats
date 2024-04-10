module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["dist/src/database/entity/*{.ts,.js}"],
  migrations: ["dist/src/database/migration/*{.ts,.js}"],
  cli: {
    entitiesDir: "src/database/entity",
    migrationsDir: "src/database/migration",
  },
  connectTimeoutMS: 60000, // 60 seconds,
  seeds: ["dist/src/database/seeding/seeds/*{.js, *.ts}"],
  factories: ["dist/src/database/seeding/factories/*{.js, *.ts}"],
  logging: true,
};
