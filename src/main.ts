import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'; 
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import helmet from '@fastify/helmet'; 
import rateLimit from '@fastify/rate-limit';

async function bootstrap() {
  // Update: Initialize Nest with the FastifyAdapter and specify the Generic type
  // This allows the use of .register() for Fastify plugins like helmet and rate-limit
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule, 
    new FastifyAdapter(), 
    { bufferLogs: true }
  );
  
  // New: Set Pino as the system-wide logger (replaces Nest's default)
  app.useLogger(app.get(Logger));

  // New: Security Best Practice - Register Helmet for secure HTTP headers
  await app.register(helmet);

  // New: Security Best Practice - Register Rate Limit to prevent brute force/DoS
  await app.register(rateLimit, {
    max: 100, // Limit each IP to 100 requests
    timeWindow: '1 minute', // per minute
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // New: Apply custom exception filter globally to format all API errors
  app.useGlobalFilters(new HttpExceptionFilter()); 

  // Removed: LoggingInterceptor (Pino handles request/response logging automatically)
  
  // Update: Fastify requires the '0.0.0.0' address to listen on all interfaces if running in Docker
  await app.listen(3000, '0.0.0.0');
  console.log(`🚀 Application is running on: http://localhost:3000`);
}
bootstrap();
