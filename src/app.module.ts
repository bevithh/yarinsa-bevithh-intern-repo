import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import Config utilities
import * as Joi from 'joi'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';
// import { LoggerMiddleware } from './common/middleware/logger.middleware'; // Removed: Pino handles this now
import { Habit } from './habits/habit.entity';
import { BullModule } from '@nestjs/bullmq';
import { LoggerModule } from 'nestjs-pino'; 

@Module({
  imports: [
    // 0. Initialize Configuration from .env file
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      // New: Security Best Practice - Validation Schema
      // This ensures the app doesn't start if critical keys are missing
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_ENCRYPTION_KEY: Joi.string().length(32).required(), // AES-256 requires 32 bytes
        DB_ENCRYPTION_IV: Joi.string().length(16).required(),
      }),
    }),

    // New: Structured Logging Configuration (nestjs-pino)
    // This replaces manual LoggerMiddleware/Interceptors
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        pinoHttp: {
          transport: config.get('NODE_ENV') !== 'production' 
            ? { target: 'pino-pretty' } // Human-readable in dev
            : undefined, // JSON format in prod
        },
      }),
    }),

    // 1. Database Connection Configuration (Updated to use environment variables)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'), 
        password: configService.get<string>('DB_PASSWORD'), 
        database: configService.get<string>('DB_NAME'),
        entities: [Habit], // Registering entity here
        synchronize: true, // Auto-syncs schema changes (Dev only)
      }),
    }),

    // 2. BullMQ Configuration
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),

    // 3. Feature Modules
    HabitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
