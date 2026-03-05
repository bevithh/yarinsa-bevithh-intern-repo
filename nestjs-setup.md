# What files are included in a default NestJS project?

A standard NestJS project consists of configuration files like package.json for managing dependencies and tsconfig.json for TypeScript rules. Inside the src/ folder, the CLI generates four essential files:

**main.ts**: The application's entry point.

**app.module.ts**: The root module that organizes the app.

**app.controller.ts**: Handles incoming HTTP requests and routing.

**app.service.ts**: Contains the core business logic (e.g., returning "Hello World").

## How does main.ts bootstrap a NestJS application?

The main.ts file acts as the "ignition" for the backend. It imports the NestFactory class and calls the create() method, passing in the AppModule to initialize the entire dependency injection tree. Finally, it calls app.listen(3000) to start the HTTP server so it can begin processing traffic.

## What is the role of AppModule in the project?

The AppModule is the Root Module of the application. NestJS uses this file to build a "module graph" or map of the entire system. It uses the @Module() decorator to link the AppController and AppService together, and it serves as the central hub where all other feature modules (like UsersModule or TasksModule) must be imported.

## How does NestJS structure help with scalability?

The framework enforces a Modular Architecture, which is critical for a large-scale app like Focus Bear. This helps scalability by:

*Isolation*: Features are broken into independent modules, so a bug in one area is less likely to crash the whole system.

*Encapsulation*: Developers can work on separate modules simultaneously without causing merge conflicts in a single giant file.

*Reusability*: Modules can be easily shared or moved between different parts of the application as it grows.