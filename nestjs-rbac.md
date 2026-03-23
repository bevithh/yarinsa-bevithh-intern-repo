# Reflection: Role-Based Authorization (RBAC) in NestJS

## 1. How does Auth0 store and manage user roles?
Auth0 manages roles through its internal **Authorization Core**. 
* **Roles:** You define roles (e.g., `Admin`, `User`, `Trainer`) and assign specific permissions to them.
* **Assignment:** Users are then assigned to these roles.
* **Tokens:** When a user logs in, Auth0 can include these roles/permissions inside the **JWT (JSON Web Token)**. To do this in NestJS, we often use an Auth0 "Action" or "Rule" to add a custom claim to the Access Token (e.g., `https://focusbear.io/roles`).

---

## 2. What is the purpose of a guard in NestJS?
A **Guard** is a class annotated with the `@Injectable()` decorator, which implements the `CanActivate` interface. 
* **The Gatekeeper:** Its sole responsibility is to determine whether a given request will be handled by the route handler or not, based on specific conditions (like being logged in or having a specific role).
* **Execution Order:** Guards execute **after** middleware but **before** any interceptors or pipes, making them the perfect place to stop unauthorized traffic before it hits your controller logic.

---

## 3. How would you restrict access to an API endpoint based on user roles?
To restrict access, you typically follow a three-step process:

1.  **Set Metadata:** Use a custom decorator (e.g., `@Roles('admin')`) to attach the required role to a specific controller method.
2.  **Create a RolesGuard:** This guard uses the `Reflector` service to see which role is required by the decorator and compares it against the user's roles found in the request token.
3.  **Apply the Guard:** Use the `@UseGuards(AuthGuard('jwt'), RolesGuard)` decorator at the controller or method level.

**Example Code Snippet:**
```typescript
@Get('admin-panel')
@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
async getAdminData() {
  return "This is sensitive Focus Bear data.";
}

---

## 4. What are the security risks of improper authorization, and how can they be mitigated?
Risks:
Insecure Direct Object References (IDOR): A user changing a URL ID (e.g., /users/5) to see another user's private data.

Privilege Escalation: A regular user finding a way to call /admin/delete-all because the endpoint wasn't properly guarded.

Data Leakage: Sensitive configuration or personal user info being exposed to the public.

Mitigations:
Principle of Least Privilege: Users should only have the minimum access necessary to perform their jobs.

Server-Side Validation: Never trust the "role" sent from a frontend state; always validate the role from a signed, server-verified JWT.

Global Guards: Apply authentication guards globally so that every new endpoint is "closed by default" unless explicitly opened.