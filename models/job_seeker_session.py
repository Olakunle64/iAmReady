#!/usr/bin/env python3
""" UserSession module
"""
from models.parent_model import ParentModel, Base
from sqlalchemy import Column, String, ForeignKey
from datetime import datetime, timedelta



class JobSeekerSession(ParentModel, Base):
    """A JobSeekerSession class that inherit from parent model"""
    __tablename__ = "jobseeker_session"
    user_id = Column("user_id", String(60), ForeignKey('job_seekers.id'), nullable=False)
    session_id = Column("session_id", String(60), nullable=False, unique=True)

    def is_expired(self):
        """check if the session has expired"""
        return datetime.now() > self.created_at + timedelta(days=7)
