# What is the role of a controller in NestJS?

The controller's role is to act as the entry point for incoming HTTP requests. It is responsible for routing (defining the URL paths), receiving data from the client, and returning the final response. It should not perform complex logic; instead, it should delegate those tasks to a service.

## How should business logic be separated from the controller?

Business logic should be entirely encapsulated within Services (Providers) rather than the controller. The controller should remain "thin," acting only as a coordinator that receives the request and then calls a method on an injected service to perform the actual work. For example, in our habits app, the controller detects a DELETE request, but the service is what actually manipulates the array.

## Why is it important to use services instead of handling logic inside controllers?

Using services ensures Separation of Concerns. This makes the code more:

*Testable*: You can test the business logic in the service without needing to simulate HTTP requests.

*Reusable*: Different controllers (or even other services) can use the same logic.

*Maintainable*: If the way you save data changes (e.g., switching databases), you only change the service, not the controller.

## How does NestJS automatically map request methods to handlers?

NestJS uses Reflector and metadata provided by decorators like @Get(), @Post(), and @Delete(). When the application starts, it scans the controllers, identifies these decorators, and automatically registers the corresponding routes in the underlying HTTP server (like Express).