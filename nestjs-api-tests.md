# Reflection: API Testing with Jest & Supertest

## 1. How does Supertest help test API endpoints?
Supertest acts as a virtual HTTP client. It allows us to send real requests (GET, POST, DELETE) to the NestJS application instance in memory. This helps us verify that the entire chain—Routes, Guards, Interceptors, Controllers, and Services—works together to return the correct status code and JSON data.

## 2. What is the difference between unit tests and API tests?
* **Unit Tests** test a single class (like a Service) by mocking everything else. They are fast and check internal logic.
* **API Tests (E2E)** test the entire "flow" of a request. They check if the database is actually updated, if validation pipes catch errors, and if the response matches the expected structure.

## 3. Why should authentication be mocked in integration tests?
Authentication is usually handled by external systems (like Keycloak or Auth0). Mocking it in E2E tests allows us to focus on testing our actual API logic without needing to manage complex login flows, handle expired tokens, or rely on an external network connection during the test run.

## 4. How can you structure API tests to cover both success and failure cases?
A good structure uses `describe` blocks for each endpoint and `it` blocks for scenarios:
* **Success Path:** Valid payload → 201 Created.
* **Validation Path:** Missing fields → 400 Bad Request.
* **Security Path:** Missing/Invalid token → 401 Unauthorized (tested by removing the mock).
* **Not Found Path:** Non-existent ID → 404 Not Found.