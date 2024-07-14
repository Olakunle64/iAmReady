#!/usr/bin/env python3
"""SessionDBAuth Class"""
import bcrypt
from api.v1.auth.auth import Auth
import os
from datetime import datetime, timedelta
import uuid
from models.job_seeker_session import JobSeekerSession
from models.recruiter_session import RecruiterSession
from models import storage
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


class SessionDBAuth(Auth):
    """A SessionDBAuth that inherit from SessionExpAuth"""
    def __init__(self):
        """initializing"""
        try:
            duration = int(os.getenv("SESSION_DURATION"))
            self.session_duration = duration
        except Exception:
            self.session_duration = 0
        self._db = storage

    def create_session(self, user_type, user_id=None):
        """create a session id and save the user_id and
            session id to the database
        """
        if not user_id or type(user_id) is not str:
            return None
        
        session_id = _generate_uuid()
        if not session_id:
            return None
        if user_type == "j":
            user = self._db.find_user_by(JobSeeker, id=user_id)
            if not user:
                return None
            newUserSession = JobSeekerSession(user_id=user.id, session_id=session_id)
        else:
            user = self._db.find_user_by(Recruiter, id=user_id)
            if not user:
                return None
            newUserSession = RecruiterSession(user_id=user.id, session_id=session_id)
        newUserSession.save()
        return session_id

    def user_id_for_session_id(self, user_type, session_id=None):
        """get the user_id based on session_id in the database"""
        if not session_id:
            return None
        if user_type == 'j':
            user = self._db.find_user_by(JobSeekerSession, session_id=session_id)
        else:
            user = self._db.find_user_by(RecruiterSession, session_id=session_id)
        if not user:
            return None
        if self.session_duration <= 0:
            return user.user_id
        cr_at = user.created_at
        exp_date = cr_at + timedelta(seconds=self.session_duration)
        if exp_date < datetime.utcnow():
            return None
        return user.user_id

    def destroy_session(self, user_type, request=None):
        """Destroy UserSession based on the session_id from cookie"""
        if not request:
            return False
        cookie_value = self.session_cookie(request)
        if not cookie_value:
            return False
        if not self.user_id_for_session_id(user_type, cookie_value):
            return False
        if user_type == 'j':
            user = self._db.find_user_by(JobSeekerSession, session_id=cookie_value)
            self._db.delete(user)
            self._db.save()
            return True
        user = self._db.find_user_by(RecruiterSession, session_id=cookie_value)
        self._db.delete(user)
        self._db.save()
        return True

    def current_user(self, request=None):
        """get the current user"""
        cookie_value = self.session_cookie(request)
        try:
            if self.get_cookie(request).get("user_type") == 'j' or request.get_json().get("user_type") == 'j':
                user_id = self.user_id_for_session_id("j", cookie_value)
                return self._db.get(JobSeeker, user_id)
        except Exception:
            pass
        user_id = self.user_id_for_session_id("r", cookie_value)
        return self._db.get(Recruiter, user_id)

    def register_user(self, cls, **kwargs):
        """register a job seeker or recruiter to the database
        """
        if not kwargs.get("email") or not kwargs.get("password"):
            return
        user = self._db.find_user_by(cls, email=kwargs.get("email"))
        if not user:
            kwargs["password"] = _hash_password(str(kwargs.get("password")))
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
        valid_paswd = bcrypt.checkpw(
            str(password).encode("utf-8"), user_exist.password)
        if valid_paswd:
            return True
        return False

    def get_user_from_session_id(self, cls, session_id: str):
        """"get a user with the session_id"""
        if not session_id:
            return None
        user = self._db.find_user_by(cls, session_id=session_id)
        if user:
            return user
        else:
            return None

    def get_reset_password_token(self, cls, email: str) -> str:
        """generate rest password token of a user with the email
            and save it to the database
        """
        id = _generate_uuid()
        user_exist = self._db.find_user_by(cls, email=email)
        if not user_exist:
            return None
        user_id = user_exist.id
        user = self._db.get(cls, user_id)
        user.reset_token_id = id
        user.save()
        return id

    def update_password(self, cls, reset_token: str, password: str) -> None:
        """update user's password"""
        user_exist = self._db.find_user_by(cls, reset_token_id=reset_token)
        if user_exist:
            hashed_paswd = _hash_password(str(password))
            user = self._db.get(cls, user_exist.id)
            user.password = hashed_paswd
            user.reset_token_id = None
            user.save()
            return None
        else:
            raise ValueError