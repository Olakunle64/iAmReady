#!/usr/bin/env python
"""This module has the defintion of the JobSeeker class"""

from sqlalchemy import Column, String
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
    educations = relationship("Education", backref="job_seeker", cascade="all, delete")
    experiences = relationship("Experience", backref="job_seeker", cascade="all, delete")
    portfolios = relationship("Portfolio", backref="job_seeker", cascade="all, delete")
    certifications = relationship("Certification", backref="job_seeker", cascade="all, delete")
    payment = relationship("Payment", backref="job_seeker", uselist=False)
    reviews = relationship("Review", backref="job_seeker", cascade="all, delete")
    jsInfo = relationship("JobSeekerInfo", backref="job_seeker", uselist=False)
    views = relationship("View", backref="job_seeker", cascade="all, delete")
    sessions = relationship("JobSeekerSession", backref="job_seeker", cascade="all, delete")

