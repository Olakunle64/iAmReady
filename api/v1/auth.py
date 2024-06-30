#!/usr/bin/env python3
"""This module has a _hash_password function"""

import bcrypt
from models import storage
from sqlalchemy.orm.exc import NoResultFound
from typing import TypeVar
import uuid
from models.recruiter import Recruiter
from models.job_seeker import JobSeeker


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


def _generate_uuid() -> str:
    """generate a uuid and return the string implementation"""
    return str(uuid.uuid4())


class Auth:
    """Auth class to interact with the authentication database.
    """

    def __init__(self):
        """initializing"""
        self._db = storage

    def register_user(self, cls, **kwargs):
        """register a job seeker or recruiter to the database
        """
        if not kwargs.get("email") or not kwargs.get("password"):
            return
        user = self._db.find_user_by(cls, email=kwargs.get("email"))
        if not user:
            kwargs["password"] = _hash_password(kwargs.get("password"))
            if kwargs.get("user_type") == "r":
                del kwargs["user_type"]
                recruiter = Recruiter(**kwargs)
                recruiter.save()
                return recruiter
            elif kwargs.get("user_type") == "j":
                del kwargs["user_type"]
                job_seeker = JobSeeker(**kwargs)
                job_seeker.save()
                return job_seeker
        else:
            raise ValueError(f"User {kwargs.get('email')} already exists")

    def valid_login(self, cls, email: str, password: str) -> bool:
        """validate user's credentials"""
        user_exist = self._db.find_user_by(cls, email=email)
        if not user_exist:
            return False
        print(f"incoming password is {password}")
        print(f"inner password is {user_exist.password}")
        valid_paswd = bcrypt.checkpw(
            password.encode("utf-8"), user_exist.password)
        if valid_paswd:
            return True
        return False

    def create_session(self, cls, email: str) -> str:
        """create a session id to the email"""
        id = _generate_uuid()
        user_exist = self._db.find_user_by(cls, email=email)
        if not user_exist:
            return None
        user_id = user_exist.id
        try:
            user = self._db.get(cls, user_id)
            user.session_id = id
            user.save()
            # user_exist = self._db.update_user(user_id, session_id=id)
            return id
        except ValueError:
            return None

    def get_user_from_session_id(self, cls, session_id: str):
        """"get a user with the session_id"""
        if not session_id:
            return None
        user = self._db.find_user_by(cls, session_id=session_id)
        if user:
            return user
        else:
            return None

    def destroy_session(self, cls, user_id: str) -> None:
        """destroy user's session_id by updating it to None"""
        user = self._db.get(cls, user_id)
        user.session_id = None
        user.save()
        return None

    def get_reset_password_token(self, cls, email: str) -> str:
        """generate rest password token of a user with the email
            and save it to the database
        """
        id = _generate_uuid()
        user_exist = self._db.find_user_by(cls, email=email)
        if not user_exist:
            raise ValueError
        user_id = user_exist.id
        user = self._db.get(cls, user_id)
        user.reset_token_id = id
        user.save()
        # self._db.update_user(user_id, reset_token=id)
        return id

    def update_password(self, cls, reset_token: str, password: str) -> None:
        """update user's password"""
        user_exist = self._db.find_user_by(cls, reset_token=reset_token)
        if user_exist:
            hashed_paswd = _hash_password(password)
            # self._db.update_user(
            #     user_exist.id, hashed_password=hashed_paswd,
            #     reset_token=None
            # )
            user = self._db.get(cls, user_exist.id)
            user.password = hashed_paswd
            user.reset_token_id = None
            user.save()
            return None
        else:
            raise ValueError


# create a Auth class
AUTH = Auth()