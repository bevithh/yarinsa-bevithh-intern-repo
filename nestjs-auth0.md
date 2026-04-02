# Reflection: Authentication with Auth0 & JWT

## Project: Focus Bear Backend Implementation
**Developer:** Yarinsa Sukhontharat  
**Topic:** Identity Management and External Auth Providers

---

## Reflection Questions

### 1. How does Auth0 handle authentication compared to traditional username/password auth?
* **Traditional:** The app stores hashed passwords in its own database. The developer is responsible for password resets, multi-factor authentication (MFA), and security breaches.
* **Auth0:** It is an "Identity-as-a-Service" (IDaaS). The user's credentials never touch our server. Auth0 handles the login UI, social logins (Google/Apple), and MFA. Our app only receives a "proof of login" (the JWT).

### 2. What is the role of JWT in API authentication?
A **JSON Web Token (JWT)** acts as a digital passport. It contains "claims" (like user ID and expiration) and is cryptographically signed.
* **Statelessness:** The server doesn't need to store "sessions" in a database. It just checks the signature of the token. If the signature is valid, the server trusts the data inside.

### 3. How do `jwks-rsa` and public/private key verification work in Auth0?
Auth0 uses **Asymmetric Encryption (RS256)**:
* **Private Key:** Auth0 keeps this secret and uses it to sign the JWT.
* **Public Key:** Auth0 publishes this at a URL (the JWKS endpoint).
* **jwks-rsa:** This library allows our NestJS app to automatically fetch that public key and verify that the JWT was indeed signed by Auth0 and hasn't been tampered with.

### 4. How would you protect an API route so that only authenticated users can access it?
In NestJS, we use **Guards**. By applying `@UseGuards(AuthGuard('jwt'))` to a controller or method, NestJS will:
1. Look for the `Bearer <token>` in the Authorization header.
2. Run the `JwtStrategy` to verify the token.
3. If valid, allow the request to proceed. If invalid or missing, return a `401 Unauthorized` error automatically.

---

## Task Checklist
- [x] Configured Auth0 Application & API
- [x] Installed `passport-jwt` and `jwks-rsa`
- [x] Implemented `JwtStrategy` in NestJS
- [x] Protected the Habits API with `AuthGuard`