import re
import secrets
import string

def generate_password(length=16, nums=3, special_chars=1, uppercase=3, lowercase=5):
  # Define the possible characters for the password
  letters = string.ascii_letters
  digits = string.digits
  symbols = string.punctuation
  # Combine all characters
  all_characters = letters + digits + symbols
  attempt = 1
  while True:
    attempt += 1
    password = ''
    # Generate password
    for _ in range(length):
      password += secrets.choice(all_characters)
    constraints = [
      (nums, r'\d'),
      (special_chars, fr'[{symbols}]'),
      (uppercase, r'[A-Z]'),
      (lowercase, r'[a-z]')
    ]
    # Check constraints        
    if all(
      constraint <= len(re.findall(pattern, password))
      for constraint, pattern in constraints
    ):
      break
  print(f"Attempt {attempt}")
  return password
  
if __name__ == "__main__":
  new_password = generate_password()
  print('Generated password:', new_password)
  