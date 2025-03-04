import random
import string

def generate_password(length=12, include_digits=True, include_special_chars=True):
    """Generate a secure random password with the specified options."""
    character_pool = string.ascii_letters
    if include_digits:
        character_pool += string.digits
    if include_special_chars:
        character_pool += string.punctuation
    
    if length < 4:
        raise ValueError("Password length must be at least 4 characters.")
    
    return ''.join(random.choices(character_pool, k=length))

def get_user_preferences():
    """Prompt the user for password preferences."""
    try:
        length = int(input("Enter password length (minimum 4): "))
        if length < 4:
            raise ValueError("Password length must be at least 4 characters.")
        
        include_digits = input("Include digits? (y/n): ").strip().lower() == 'y'
        include_special_chars = input("Include special characters? (y/n): ").strip().lower() == 'y'
        
        return length, include_digits, include_special_chars
    except ValueError as e:
        print(f"Invalid input: {e}")
        return get_user_preferences()

if __name__ == "__main__":
    length, include_digits, include_special_chars = get_user_preferences()
    print("Generated Password:", generate_password(length, include_digits, include_special_chars)
