#!/usr/bin/python3
"""This module has the defintion of the Education class"""
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from models.parent_model import ParentModel, Base
from sqlalchemy.orm import relationship, backref


class Education(ParentModel, Base):
    """Education class"""
    __tablename__ = 'educations'
    school = Column("school", String(128), nullable=False)
    degree = Column("degree", String(128), nullable=False)
    fieldOfStudy = Column("fieldOfStudy", String(128), nullable=False)
    startDate = Column("startDate", Date, nullable=False)
    endDate = Column("endDate", Date, nullable=False)
    job_seeker_id = Column(String(60), ForeignKey('job_seekers.id'), nullable=False)


# added attr:
# degree
# school
