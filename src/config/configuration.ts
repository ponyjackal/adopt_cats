export default () => ({
  port: Number(process.env.PORT) || 3000,
  database: {
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrationsRun: true,
    entities: ["dist/src/database/entity/*{.ts,.js}"],
    migrations: ["dist/src/database/migration/*{.ts,.js}"],
    cli: {
      migrationsDir: "src/database/migration",
    },
    connectTimeoutMS: 60000, // 60 seconds
  },
});
