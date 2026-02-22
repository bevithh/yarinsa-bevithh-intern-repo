# Clean Code Principles

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