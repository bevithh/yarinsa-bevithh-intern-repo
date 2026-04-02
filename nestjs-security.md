# Reflection: NestJS Security Best Practices

## Project: Focus Bear Backend Implementation
**Developer:** Yarinsa Sukhontharat  
**Topic:** Application Hardening and Protection

---

## Reflection Questions

### 1. What are the most common security vulnerabilities in a NestJS backend?
* **SQL Injection:** Occurs when untrusted data is sent to an interpreter as part of a command or query. (Prevented by using TypeORM/TypeORM parameters).
* **Cross-Site Scripting (XSS):** Injecting malicious scripts into web pages viewed by other users.
* **Broken Authentication:** Poorly implemented session management or credential storage.
* **CORS Misconfiguration:** Allowing unauthorized domains to make requests to the API.

### 2. How does `@fastify/helmet` improve application security?
Helmet is a collection of smaller middleware functions that set specific HTTP response headers:
* **X-DNS-Prefetch-Control:** Controls DNS prefetching.
* **X-Frame-Options:** Prevents clickjacking by prohibiting the page from being put in an `<iframe>`.
* **Strict-Transport-Security (HSTS):** Enforces secure (HTTP over SSL/TLS) connections to the server.
* **Content-Security-Policy:** Prevents XSS by defining which dynamic resources are allowed to load.

### 3. Why is rate limiting important for preventing abuse?
* **DoS Protection:** It prevents a single user (or bot) from overwhelming the server with thousands of requests, ensuring the service remains available for others.
* **Brute Force Mitigation:** It slows down attackers trying to guess passwords or API keys by limiting the number of attempts they can make per minute.
* **Cost Control:** For APIs that trigger expensive operations (like AI generation or sending SMS), it prevents accidental or malicious budget spikes.

### 4. How can sensitive configuration values be protected in a production environment?
* **Never Commit `.env`:** Ensure `.env` is always in `.gitignore`.
* **Environment Injection:** In production (like AWS or Heroku), use the platform's native environment variable management rather than a file.
* **Validation:** Use a validation schema (like Joi) to ensure all required secrets are present and follow the correct format before the app starts.
* **Secret Management:** For highly sensitive data, use services like AWS Secrets Manager or HashiCorp Vault instead of plain environment variables.

---

## Task Checklist
- [x] Researched common security risks (OWASP Top 10)
- [x] Implemented `@fastify/helmet` for header security
- [x] Set up `@fastify/rate-limit`
- [x] Added `Joi` validation for environment variables