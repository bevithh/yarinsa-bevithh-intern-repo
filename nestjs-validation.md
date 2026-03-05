# What is the purpose of pipes in NestJS?

Pipes act as a processing layer between the incoming request and the controller. They are used for transformation (e.g., converting a string "123" into a number) and validation (checking if the data meets specific requirements like length or type).

## How does ValidationPipe improve API security and data integrity?

The ValidationPipe ensures that the Focus Bear backend only processes data that perfectly matches our predefined DTOs. By automatically rejecting malformed or malicious data with a 400 Bad Request error, it prevents junk data from entering the database and protects against injection attacks.

## What is the difference between built-in and custom pipes?

Built-in pipes (like ParseIntPipe or ParseUUIDPipe) are standard tools provided by NestJS for common tasks. Custom pipes are developer-written classes that implement the PipeTransform interface to handle unique project needs, such as verifying if a specific resource exists in the database before proceeding.

## How do decorators like @IsString() and @IsNumber() work with DTOs?

These decorators provide metadata to the class-validator library. When the ValidationPipe is active, it inspects these decorators to verify the request body. If a user sends a number for a field marked @IsString(), the pipe identifies the mismatch and stops the request before it reaches the service.