# NestJS Project README

## Description

This project utilizes the [Nest](https://github.com/nestjs/nest) framework to build efficient, reliable, and scalable server-side applications. It integrates various technologies for comprehensive functionality, including PostgreSQL for the database, TypeORM for ORM, Swagger for API documentation, and Passport for authentication.

## Technologies

- **Database**: PostgreSQL
- **ORM**: TypeORM
- **API Documentation**: Swagger
- **Authentication**: Passport

## Installation

Ensure that Node.js (preferably the latest LTS version) and PostgreSQL are installed on your machine. Then, follow these steps:

```bash
# Clone the project
git clone <repository-url>

# Navigate to the project directory
cd <project-directory>

# Install dependencies
npm install
```

## Environment variables

Create `.env` file from `.env.example`

```bash
# App
PORT=3000

# PostgreSQL Database
DB_HOST="localhost"
DB_PORT=5432
DB_USER="postgres"
DB_PASSWORD="password"
DB_NAME="postgres"

HASH_SALT=14
JWT_SECRET="secret"
```

## Running the App

You can start the application in various environments using the following commands:

```bash
# Development mode
npm run start:dev

# Debug mode
npm run start:debug

# Production mode
npm run start:prod
```

## Database Migrations

To manage your database schema, use these commands:

```bash
# Generate a new migration
npm run migration:generate --name=<MigrationName>

# Run migrations
npm run migration:run

# Revert the last migration
npm run migration:revert
```

## Linting and Formatting

Keep your codebase clean with these commands:

```bash
# Linting
npm run lint

# Formatting
npm run format
```

## Testing

Ensure the integrity of your application with tests:

```bash
# Unit tests
npm run test

# Watch mode for unit tests
npm run test:watch

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## API Documentation

Access the Swagger UI to interact with the API and explore the available endpoints once the application is running:

```bash
http://localhost:3000/api
```
