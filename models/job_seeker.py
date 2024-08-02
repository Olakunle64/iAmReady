#!/usr/bin/env python
"""This module has the defintion of the JobSeeker class"""

from sqlalchemy import Column, String, Integer, Boolean
from models.user import User
from models.parent_model import ParentModel, Base
from sqlalchemy.orm import relationship, backref
from sqlalchemy.dialects.postgresql import ARRAY


class JobSeeker(User, Base):
    """JobSeeker class"""
    __tablename__ = 'job_seekers'
    firstName = Column("firstName", String(128), nullable=False)
    lastName = Column("lastName", String(128), nullable=False)
    skills = Column("skills", ARRAY(String), nullable=False)
    jobName = Column("jobName", String(128), nullable=False)
    resume = Column("resume", String(1024), nullable=True)
    bio = Column("bio", String(1024), nullable=True)
    amount = Column("amount", Integer, nullable=True)
    paid = Column("paid", Boolean, default=True)
    educations = relationship("Education", backref="job_seeker", cascade="all, delete")
    experiences = relationship("Experience", backref="job_seeker", cascade="all, delete")
    portfolios = relationship("Portfolio", backref="job_seeker", cascade="all, delete")
    certifications = relationship("Certification", backref="job_seeker", cascade="all, delete")
    reviews = relationship("Review", backref="job_seeker", cascade="all, delete")
    views = relationship("View", backref="job_seeker", cascade="all, delete")
    sessions = relationship("JobSeekerSession", backref="job_seeker", cascade="all, delete")

