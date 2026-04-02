# Reflection: Logging & Error Handling in NestJS

## Project: Focus Bear Backend Implementation
**Developer:** Yarinsa Sukhontharat  
**Topic:** Structured Logging with `nestjs-pino` and Global Exception Mapping

---

## Reflection Questions

### 1. What are the benefits of using `nestjs-pino` for logging?
* **Performance:** Pino is one of the fastest loggers for Node.js. It has very low overhead, which is crucial for high-performance backends like Focus Bear.
* **Structured JSON Output:** Unlike `console.log`, Pino outputs logs in JSON format. This allows log management tools (like Datadog or ELK) to easily search, filter, and analyze logs based on fields like `level`, `responseTime`, or `statusCode`.
* **Automatic Request Tracking:** It automatically logs every incoming HTTP request and its corresponding response, including the time taken (latency) and the final status code, without needing manual middleware.
* **Developer Experience:** With `pino-pretty`, logs remain human-readable during local development while staying machine-readable in production.

### 2. How does global exception handling improve API consistency?
* **Uniform Response Schema:** Without a global filter, different types of errors (Validation errors, Database errors, 404s) might return different JSON structures. A global filter ensures every error follows the exact same format (e.g., always containing `statusCode`, `timestamp`, `path`, and `message`).
* **Simplified Frontend Logic:** Since the error structure is guaranteed, the frontend team only needs to write one error-handling function to display messages to users.
* **Centralized Security:** It allows us to catch unexpected 500 errors and hide sensitive stack traces from the end-user while still logging the full details internally for the developers.

### 3. What is the difference between a logging interceptor and an exception filter?
| Feature | Logging Interceptor | Exception Filter |
| :--- | :--- | :--- |
| **Execution Timing** | Runs **before** and **after** the request handler. | Runs **only** when an exception is thrown. |
| **Primary Goal** | Used to log request/response data and measure execution time. | Used to catch, format, and modify error responses. |
| **Success vs Failure** | Sees both successful and failed requests. | Only triggers during failures. |
| **Use Case** | Performance monitoring and audit trails. | Standardizing error messages and hiding stack traces. |

### 4. How can logs be structured to provide useful debugging information?
To make logs truly "debuggable," they should include:
* **Context/Scope:** Identifying which service or controller the log came from (e.g., `[HabitsService]`).
* **Correlation IDs:** A unique `trace-id` for every request so you can follow a single user's journey through multiple logs.
* **Metadata over Strings:** Instead of logging `logger.log("User " + id + " failed")`, use `logger.log({ userId: id }, "User login failed")`. This makes the `userId` a searchable field.
* **Log Levels:** Using appropriate levels (`info` for flow, `warn` for non-critical issues, `error` for crashes) to help developers filter out noise.

---

## Task Checklist
- [x] Researched `nestjs-pino`
- [x] Set up structured logging in `AppModule`
- [x] Configured `pino-pretty` for development
- [x] Implemented `HttpExceptionFilter`
- [x] Applied Global Filter in `main.ts`