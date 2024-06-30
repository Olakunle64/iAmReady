#!/usr/bin/env python3
""" UserSession module
"""
from models.parent_model import ParentModel, Base
from sqlalchemy import Column, String, ForeignKey



class JobSeekerSession(ParentModel, Base):
    """A JobSeekerSession class that inherit from parent model"""
    __tablename__ = "jobseeker_session"
    user_id = Column("user_id", String(60), ForeignKey('job_seekers.id'), nullable=False)
    session_id = Column("session_id", String(60), nullable=False, unique=True)
