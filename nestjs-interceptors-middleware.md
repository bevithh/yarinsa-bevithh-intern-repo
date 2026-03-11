# What is the difference between an interceptor and middleware in NestJS?

Middleware is called before the route handler and is used for low-level tasks like logging incoming request methods or checking headers.

Interceptors have a much broader scope; they wrap the entire request-response cycle using RxJS. This allows them to execute logic both before the handler and after the handler returns a response, which is perfect for transforming the final data sent to the user.

## When would you use an interceptor instead of middleware?

You should use an interceptor when you need to:

Transform the response: For example, wrapping every response in a standard { "success": true, "data": ... } object.

Access Execution Context: Interceptors know which specific controller method is being called, whereas middleware is "blind" to the final handler.

Handle Post-Response Logic: Such as logging how long a request took after it has finished.

## How does LoggerErrorInterceptor help?

While not a built-in class, interceptors used for error logging are essential for centralized error handling. They capture any exceptions thrown by a service or controller and log the full error details (like the stack trace) for the Focus Bear dev team while ensuring the end-user receives a clean, non-technical error message.