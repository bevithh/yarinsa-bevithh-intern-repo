# Reflection: Environment Variables & Configuration

## 1. How does @nestjs/config help manage environment variables?
The `@nestjs/config` package provides a centralized way to load and access configuration. It internally uses the `dotenv` library to load variables from a `.env` file into `process.env`. By using the `ConfigService`, NestJS allows us to inject these variables into any service or controller using dependency injection, making the code cleaner and more testable.

## 2. Why should secrets (e.g., API keys, DB passwords) never be stored in source code?
* **Security Risk:** If the source code is leaked or pushed to a public repository, attackers can gain full access to your database or paid API services.
* **Flexibility:** Hardcoding values makes it impossible to change settings (like the database URL) between Local, Staging, and Production environments without rewriting the code.
* **Compliance:** Many security standards and audits strictly forbid storing plain-text credentials in version control.

## 3. How can you validate environment variables before the app starts?
NestJS allows you to use a **Validation Schema** (often using the `joi` library) within the `ConfigModule.forRoot()`. This ensures that if a required variable like `DB_PASSWORD` is missing or is the wrong data type, the application will throw an error and refuse to start, preventing runtime crashes in production.

## 4. How can you separate configuration for different environments?
You can create multiple env files (e.g., `.env.development`, `.env.production`). In `app.module.ts`, you can dynamically tell NestJS which file to load based on a "NODE_ENV" variable:

```typescript
ConfigModule.forRoot({
  envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
});