# How does dependency injection improve maintainability?

DI improves maintainability by decoupling classes. Because a controller doesn't "know" how to create its service, you can change the service's internal logic (or swap it for a different version) without touching the controller code. This makes the Focus Bear codebase much easier to refactor and test.

## What is the purpose of the @Injectable() decorator?

The @Injectable() decorator marks a class as a provider. It signals to the NestJS runtime that the class can be managed by the Inversion of Control (IoC) container, allowing it to be injected into other classes like controllers or other services.

## What are the different types of provider scopes, and when would you use each?

The three scopes are DEFAULT, REQUEST, and TRANSIENT. DEFAULT (Singleton) is used for most services to save memory and share state. REQUEST is used when you need a fresh instance for every user request, often for security or logging. TRANSIENT is used for unique, lightweight instances that aren't shared between different components.

## How does NestJS automatically resolve dependencies?

NestJS resolves dependencies by building a Dependency Graph during the "bootstrap" phase in main.ts. It looks at the types declared in a class constructor, finds the corresponding @Injectable() provider in the module, and automatically instantiates them in the correct order.#