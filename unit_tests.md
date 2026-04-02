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

## Task Checklist
- [x] Researched Redux Toolkit testing patterns
- [x] Created/Identified a Redux Slice
- [x] Wrote unit tests for Reducers
- [x] Verified tests pass using `npm test`
- [x] Pushed test files to GitHub