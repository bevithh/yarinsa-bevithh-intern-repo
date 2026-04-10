# Reflection: Mocking Dependencies & Database Interactions

## 1. Why is mocking important in unit tests?
Mocking is critical for **isolation**. It ensures that when a test fails, it is because of a bug in the code being tested, not because of a failure in a dependency like a database, an external API, or a message queue (like BullMQ). This makes tests deterministic and extremely fast.

## 2. How do you mock a NestJS provider (e.g., a service in a controller test)?
In NestJS, we use the `Test.createTestingModule` utility. Instead of importing the whole module, we use the `providers` array to map the real provider (e.g., `HabitsService`) to a mock object using `useValue`. This replaces the real class with a "spy" or "stub" that we control.

## 3. What are the benefits of mocking the database instead of using a real one?
* **Speed:** In-memory mocks run in milliseconds, whereas real database I/O is slow.
* **Environment Independence:** Tests can run on any machine without needing Docker, PostgreSQL, or Redis installed.
* **Consistency:** Mocks allow you to simulate specific database states (like a missing record) without actually modifying or cleaning up real data.

## 4. How do you decide what to mock vs. what to test directly?
The general rule is to mock everything **external** to the class you are testing. 
* If testing a **Controller**, mock its **Services**. 
* If testing a **Service**, mock its **Repositories** and **Queues**. 
Unit tests should only prove that the logic inside the specific file is correct, assuming its neighbors do their jobs.