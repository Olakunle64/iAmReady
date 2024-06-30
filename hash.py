import bcrypt


def _hash_password(password: str) -> bytes:
    """
    Hash a password using bcrypt.

    Args:
    - password (str): The password to hash.

    Returns:
    - bytes: The hashed password.
    """
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode(), salt)
    return hashed_password

password = "password"
hashed_password = _hash_password(password)
print(hashed_password)
print(str(hashed_password))
print(type(hashed_password))
print(bcrypt.checkpw(password.encode(), hashed_password))