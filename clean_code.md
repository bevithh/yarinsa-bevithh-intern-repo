# 4.1 Clean Code Principles

## Core Concepts

### 1. Simplicity (KISS)
* **Definition:** Keeping code as simple as possible by avoiding unnecessary complexity.
* **Why it matters:** Simple code is easier to debug and less likely to hide "sneaky" bugs.

### 2. Readability
* **Definition:** Writing code that is easy for humans to read and understand.
* **Why it matters:** We spend much more time reading code than writing it. Using descriptive names like `is_payment_complete` is better than `status`.

### 3. Maintainability
* **Definition:** Organizing code so that it can be easily updated or fixed in the future.
* **Why it matters:** Good structure prevents "technical debt" where a small change causes the whole app to break.

---

## Code Refactoring Example

### Messy Code (The "Before")
> **Issues:** Vague variable names (`d`, `v`), "Magic Numbers" (0.05), and confusing nested if-statements.



```python
def proc(d, v):
    if v > 0:
        if d == "member":
            return v - (v * 0.05)
        else:
            if v > 100:
                return v - 10
            else:
                return v
    else:
        return 0

Clean Code (The "After")

Improvements: Used Guard Clauses to remove nesting and Constants to explain the numbers.

# Constants make the logic easy to adjust later
DISCOUNT_RATE = 0.05
THRESHOLD = 100

def calculate_discounted_total(customer_type, total_amount):
    # Guard clause: handle invalid input immediately
    if total_amount <= 0:
        return 0

    if customer_type == "member":
        return total_amount * (1 - DISCOUNT_RATE)
    
    if total_amount > THRESHOLD:
        return total_amount - 10

    return total_amount


## 4.2 Variable & Function Naming

### What makes a good name?
* **Intention-revealing:** It tells you why it exists and what it is used for.
* **Pronounceable:** Avoid weird abbreviations like `usr_auth_str` (use `user_authentication_string` or `user_token`).
* **Consistent:** If you use `fetch` for API calls, don't switch to `get` or `retrieve` halfway through the project.

### Issues caused by poor naming
* **High Cognitive Load:** You have to keep a "map" in your head of what `x` and `y` mean.
* **Bug Risk:** It's easy to pass the wrong data into a function if the names are vague.
* **Maintenance Pain:** Future developers (including your future self) will waste time trying to "decipher" the code instead of improving it.

### Reflection on Refactoring
Refactoring the code by renaming variables immediately made the logic "obvious." I no longer had to look at the math (`a * b`) to guess what the function did; the name `calculate_area` told me everything I needed to know before I even read the body of the function.