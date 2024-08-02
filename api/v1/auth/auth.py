#!/usr/bin/env python3
"""Authentication Class"""

from flask import request
from typing import List, TypeVar
import os


class Auth:
    """Auth class"""
    def require_auth(self, path: str, excluded_paths: List[str]) -> bool:
        """require path"""
        if not path or not excluded_paths or not len(excluded_paths):
            return True
        if path[-1] != "/":
            path += "/"
        for ex_path in excluded_paths:
            if ex_path.endswith("*"):
                ex_path = ex_path.rstrip("*")
            if path == ex_path or ex_path in path:
                return False
        else:
            return True

    def authorization_header(self, request=None) -> str:
        """authorization header"""
        if not request or not request.headers.get("Authorization"):
            return None
        else:
            return request.headers.get("Authorization")

    def current_user(self, request=None) -> TypeVar('User'):
        """current user"""
        return None

    def session_cookie(self, request=None):
        """returns a cookie value from a request"""
        if not request:
            return None
        cookie_name = os.getenv("SESSION_NAME", "session_id")
        if request.cookies.get(cookie_name):
            return request.cookies.get(cookie_name)
        if self.get_cookie(request):
            return self.get_cookie(request).get(cookie_name)
    
    def get_cookie(self, request=None):
        if request.headers.get("Authorization"): 
            try:  
                cookie = request.headers.get("Authorization")
                session_id = cookie.split(",")[0].split(":")[1].strip('"')
                user_type = cookie.split(",")[1].split(":")[1].split("}")[0].strip('"')
                return {
                    "session_id": session_id,
                    "user_type": user_type
                }
            except Exception:
                return None
        return None
