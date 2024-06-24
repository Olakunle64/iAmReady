#!/usr/bin/python3
"""This module has the defintion of the Experience class"""
from sqlalchemy import Column, String, Integer, ForeignKey
from models.parent_model import ParentModel, Base
from sqlalchemy.orm import relationship, backref


class Experience(ParentModel, Base):
    """Experience class"""
    __tablename__ = 'experiences'
    company = Column("company", String(128), nullable=False)
    location = Column("location", String(128), nullable=True)
    startDate = Column("startDate", String(128), nullable=False)
    endDate = Column("endDate", String(128), nullable=False)
    description = Column("description", String(1024), nullable=False)
    job_seeker_id = Column(String(60), ForeignKey('job_seekers.id'), nullable=False)


# added attr:
# company, location, job_seeker_id