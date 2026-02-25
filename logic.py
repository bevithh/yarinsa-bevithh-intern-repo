def calculate_membership_fee(age, is_student=False):
    if age < 0:
        raise ValueError("Age cannot be negative")
    
    if is_student or age < 18:
        return 10.0
    
    if age >= 65:
        return 15.0
        
    return 25.0