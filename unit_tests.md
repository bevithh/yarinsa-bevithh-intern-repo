# Reflection: Testing Redux with Jest

## Reflection Questions

### 1. What was the most challenging part of testing Redux?
The most challenging part is often testing **Asynchronous Thunks**. Because thunks involve multiple dispatched actions (pending, fulfilled, or rejected) and often involve external API calls, you have to "mock" the API response using tools like `jest-fetch-mock` or `msw` (Mock Service Worker). Ensuring the state updates correctly after the promise resolves requires careful setup of the mock environment.

### 2. How do Redux tests differ from React component tests?
* **Purity vs. Side Effects:** Redux reducer tests are tests of **pure functions**. You give an input and expect an output. There is no "rendering" or "DOM" involved.
* **Scope:** React component tests focus on user interaction (clicks, typing) and what the user *sees*. Redux tests focus on data integrity—making sure the "brain" of the app is calculating the state correctly.
* **Speed:** Because Redux tests don't require a virtual DOM (like JSDOM), they usually execute much faster than component tests.
* **Dependencies:** Component tests often require wrapping the component in a `<Provider>`, whereas Reducer tests can be run by simply importing the reducer function.

---
# Unit Testing Reflection: Mocking API Calls

## 1. Why is it important to mock API calls in tests?
Mocking API calls is essential for several reasons:
* **Speed:** Real network requests take time. Mocks run locally and nearly instantaneously, allowing for a faster CI/CD pipeline.
* **Reliability (Determinism):** External APIs can go down or return different data over time. Mocking ensures the test environment is controlled and results are consistent.
* **Cost & Side Effects:** Some APIs charge per request. Additionally, mocking prevents tests from accidentally creating "garbage" data in a production or staging database.
* **Isolation:** It allows us to test the component's logic (how it handles data) rather than testing whether the API itself works.

## 2. What are some common pitfalls when testing asynchronous code?
* **Not using `await` or `waitFor`:** Tests often finish executing before the asynchronous API call resolves, leading to "false negatives" where tests pass even if the code is broken.
* **Leaking Mocks:** If you don't clear mocks between tests using `jest.clearAllMocks()`, the call counts (e.g., `toHaveBeenCalledTimes`) might carry over from previous tests, causing confusing failures.
* **Improper Error Handling:** Forgetting to mock a "rejected" promise to test how the UI handles API failures.
* **Testing Implementation Details:** Focusing too much on *how* axios was called rather than *what* the user sees on the screen after the data arrives.
---
