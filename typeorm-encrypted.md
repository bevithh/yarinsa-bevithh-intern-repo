# Reflection: Data Encryption with `typeorm-encrypted`

## Project: Focus Bear Backend Implementation
**Developer:** Yarinsa Sukhontharat  
**Topic:** Application-Level Field Encryption (ALE)

---

## Reflection Questions

### 1. Why does Focus Bear double encrypt sensitive data instead of relying on database encryption alone?
* **Defense in Depth:** If an attacker gains access to the database (via a SQL injection or a leaked backup), database-at-rest encryption is useless because the disk is already "unlocked" for the DB engine. Application-level encryption ensures the data is still ciphertext.
* **Separation of Duties:** It prevents Database Administrators (DBAs) from seeing sensitive user content. Only the application holding the `DB_ENCRYPTION_KEY` can read the actual values.

### 2. How does `typeorm-encrypted` integrate with TypeORM entities?
* It uses TypeORM **Value Transformers**. 
* When saving (`to` method), it encrypts the plain text into a base64 string.
* When retrieving (`from` method), it decrypts the base64 string back into plain text. 
* This makes the process transparent to the developer; you just work with the entity as usual.

### 3. What are the best practices for securely managing encryption keys?
* **Never Hardcode:** Keys should never exist in the source code.
* **Length Matters:** For `aes-256-cbc`, the key must be exactly 32 characters.
* **Environment Isolation:** Use different keys for `development`, `staging`, and `production`.
* **Key Rotation:** Have a strategy to update keys periodically or in case of a leak.
* **Vaults:** In production, use a Secret Manager (like AWS KMS or HashiCorp Vault) rather than a simple `.env` file.

### 4. What are the trade-offs between encrypting at the database level vs. the application level?
| Feature | Database Level (At Rest) | Application Level (Field-Level) |
| :--- | :--- | :--- |
| **Searchability** | Can still search/index fields normally. | Searching encrypted fields is impossible without fetching all records. |
| **Performance** | Low overhead (handled by hardware). | Higher CPU overhead (handled by Node.js). |
| **Security Scope** | Protects against stolen physical drives. | Protects against DB breaches and unauthorized DB access. |
| **Complexity** | Easy (usually a checkbox in RDS). | High (requires manual setup and key management). |

---

## Task Checklist
- [x] Installed `typeorm-encrypted`
- [x] Added `EncryptionTransformer` to the Habit entity
- [x] Generated a secure 32-character key for `.env`
- [x] Verified that data is stored as ciphertext in DBeaver/PostgreSQL