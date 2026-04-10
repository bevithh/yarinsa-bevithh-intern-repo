# Reflection: Writing Unit Tests for Services & Controllers

## 1. Why is it important to test services separately from controllers?
* **Isolation of Logic:** Services contain the business logic (the "how"), while controllers handle communication (the "what"). Testing them separately ensures that a bug in your habit-calculation logic isn't hidden by a mistake in your routing or authentication guards.
* **Simplification:** Controllers often have complex decorators like `@UseGuards` or `@UseInterceptors`. By testing the service separately, we can verify the core logic without having to bypass these HTTP-layer complexities.

## 2. How does mocking dependencies improve unit testing?
* **Reliability:** Unit tests shouldn't fail because the database is offline or Redis is down. Mocking dependencies like repositories or external services makes tests deterministic—they will always return the same result.
* **Control:** Mocking allows us to test "unhappy paths." We can force a mock repository to throw an error or return an empty result to see how our service or controller handles those specific edge cases.

## 3. What are common pitfalls when writing unit tests in NestJS?
* **Naming Mismatches:** A common pitfall is mocking a function name (e.g., `findAll`) that doesn't match the actual service method name (e.g., `getAllHabits`), which leads to runtime errors in the test.
* **Dependency Injection Errors:** Forgetting to include a provider in the `TestingModule` setup is a frequent cause of the "Nest can't resolve dependencies" error.
* **Guard Interference:** Controllers are often protected by Guards (like `AuthGuard`). If you don't use `.overrideGuard()`, your unit tests might fail with a 401 Unauthorized error instead of actually testing the method.

## 4. How can you ensure that unit tests cover all edge cases?
* **Input Validation:** Testing what happens when IDs are passed as strings vs. numbers, or when a DTO is missing required fields.
* **Async Handling:** Ensuring all promises are correctly awaited so that tests don't finish before the logic is executed.
* **Coverage Reports:** Using `npm run test -- --coverage` to see a visual map of exactly which lines of code were executed during the tests and which ones were missed.