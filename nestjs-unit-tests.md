# Reflection: Unit Testing Services & Controllers

## 1. Why is it important to test services separately from controllers?
* **Separation of Concerns:** Controllers handle HTTP status codes, routing, and request validation. Services handle complex business logic. Testing them separately allows you to pinpoint exactly where a bug is (e.g., "Is the logic wrong, or is the API route not receiving the data?").
* **Complexity:** Services often have many dependencies. Testing them in isolation makes it easier to verify complex "if/else" logic without worrying about HTTP headers or request objects.

## 2. How does mocking dependencies improve unit testing?
* **Isolation:** It ensures that a failure in the Database or an external API doesn't cause your unit test to fail.
* **Predictability:** You can force a mock to return a specific value (like an error or an empty array) to see how your code handles those specific scenarios.
* **Speed:** Mocked dependencies run in-memory, making tests finish in milliseconds rather than seconds.

## 3. What are common pitfalls when writing unit tests in NestJS?
* **Missing Providers:** Forgetting to include a mock for a dependency in the `Test.createTestingModule` block, leading to "Nest can't resolve dependencies" errors.
* **Not Clearing Mocks:** If one test calls a mock twice and the next test expects it to be called once, the counts might leak if you don't use `jest.clearAllMocks()`.
* **Testing Implementation instead of Outcome:** Spending too much time checking *how* the service was called rather than checking if the *result* is correct.

## 4. How can you ensure that unit tests cover all edge cases?
* **Boundary Testing:** Test the absolute minimums and maximums (e.g., an empty string, a zero, a very large number).
* **Error Paths:** Specifically write tests that force a dependency to throw an error to ensure your service handles it gracefully.
* **Code Coverage Tools:** Run `npm run test -- --coverage` to see exactly which lines of code your tests have not touched yet.