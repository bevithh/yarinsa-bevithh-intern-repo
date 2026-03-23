# Reflection: TypeORM Migrations & Seeding

## 1. What is the purpose of database migrations in TypeORM?
The primary purpose of migrations is **version control for your database schema**. Instead of manually executing SQL commands to add or remove columns, migrations allow you to define these changes in code. 

This ensures that every developer on the team—and every environment (Development, Staging, Production)—is running the exact same database structure, preventing "it works on my machine" errors.

---

## 2. How do migrations differ from seeding?

| Feature | Migrations | Seeding |
| :--- | :--- | :--- |
| **Focus** | **Schema/Structure** (DDL) | **Data/Content** (DML) |
| **Goal** | Defining tables, columns, and relations. | Filling tables with initial or test data. |
| **Example** | Adding a `profile_picture` column to the `User` table. | Creating a "dummy" admin user to log in for the first time. |
| **Lifecycle** | Runs once per environment as the app evolves. | Can be run multiple times to reset test states. |

---

## 3. Why is it important to version-control database schema changes?
* **Consistency:** Prevents **Schema Drift**, where one developer’s local database has a column that doesn't exist on the server, causing the application to crash.
* **Traceability:** You can use `git log` to see exactly when a table was modified, why it was changed, and who made the change.
* **Automation:** In CI/CD pipelines (like those used at **Focus Bear**), migrations can be automatically applied during deployment, removing the risk of human error during manual updates.

---

## 4. How can you roll back a migration if an issue occurs?
TypeORM provides a built-in revert command:

```bash
npx typeorm-ts-node-commonjs migration:revert -d ./src/data-source.ts
```

## Summary of CLI Commands
Generate: ```bash typeorm migration:generate``` <path> — Automates migration creation by comparing entities vs. DB.

Run: ```bash typeorm migration:run``` — Applies all pending migrations to the database.

Revert: ```bash typeorm migration:revert```  — Undoes the last applied migration.