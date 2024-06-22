#!/usr/bin/python3
"""This module has the defintion of the JobSeekerInfo class"""
from sqlalchemy import Column, String, Integer, ForeignKey
from models.parent_model import ParentModel, Base
from sqlalchemy.orm import relationship, backref


class JobSeekerInfo(ParentModel, Base):
    """JobSeekerInfo class"""
    __tablename__ = 'job_seeker_info'
    jobName = Column("jobName", String(128), nullable=False)
    resume = Column("resume", String(1024), nullable=True)
    job_seeker_id = Column(String(60), ForeignKey('job_seekers.id'), nullable=False)
    bio = Column("bio", String(1024), nullable=True)
    salaryRange = Column("salaryRange", Integer, nullable=True)
