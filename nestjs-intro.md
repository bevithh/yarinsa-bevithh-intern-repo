# What are the key differences between NestJS and Express.js?

Express is a minimalist library that lets you define routes and middleware however you like. NestJS is a full-featured framework that enforces a structured architecture inspired by Angular. While Express is flexible, NestJS provides built-in support for TypeScript, Dependency Injection, and a modular system that makes large apps easier to maintain.

## Why does NestJS use decorators extensively?

Decorators (like @Controller() or @Get()) allow NestJS to use Declarative Programming. Instead of writing lines of code to "register" a route, you simply "decorate" a class or method. This makes the code much more readable and allows the framework to automatically handle the underlying logic of routing and metadata.

## How does NestJS handle dependency injection?

NestJS uses an IoC (Inversion of Control) Container. When a class (like a Controller) needs a dependency (like a Service), it declares it in its constructor. The NestJS runtime then automatically "injects" the correct instance of that service when the application starts.

## What benefits does modular architecture provide in a large-scale app?

In a large app like Focus Bear, modularity allows developers to isolate different features. This prevents the codebase from becoming a "monolith" where everything is connected to everything else. It makes the code easier to navigate, enables independent testing of features, and allows multiple developers to work on different modules without causing merge conflicts.