# What is the purpose of a module in NestJS?

A module is a class annotated with a @Module() decorator that provides metadata NestJS uses to organize the application structure. Each application has at least one root module (the AppModule), which serves as the starting point for the framework to build the internal "Dependency Graph".

## How does a controller differ from a provider?

A Controller is strictly responsible for handling HTTP requests and returning responses to the client (routing). A Provider (like a Service) is responsible for the business logic, such as data validation or database interactions. Controllers should remain "thin" and delegate complex tasks to Providers.

## Why is dependency injection useful in NestJS?

Dependency Injection (DI) is useful because it decouples the creation of a class from its usage. This makes the code much easier to test because you can easily swap real services for "mock" services during testing. It also improves maintainability by allowing NestJS to manage the lifecycle of objects for you.

## How does NestJS ensure modularity and separation of concerns?

NestJS ensures modularity by requiring features to be wrapped in their own @Module. This creates clear boundaries between different parts of the application. Separation of concerns is achieved by splitting the "Web" layer (Controllers) from the "Logic" layer (Services/Providers), ensuring that each class has one specific job.