import pytest
from logic import calculate_membership_fee

def test_student_discount():
    assert calculate_membership_fee(25, is_student=True) == 10.0

def test_senior_discount():
    assert calculate_membership_fee(70) == 15.0

def test_negative_age_raises_error():
    with pytest.raises(ValueError):
        calculate_membership_fee(-5)

def test_standard_fee():
    assert calculate_membership_fee(30) == 25.0