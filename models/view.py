#!/usr/bin/python3
"""This module has the defintion of the View class"""
from sqlalchemy import Column, String, Integer, ForeignKey
from models.parent_model import ParentModel, Base
from sqlalchemy.orm import relationship, backref
from datetime import datetime


class View(ParentModel, Base):
    """View class"""
    __tablename__ = 'views'
    job_seeker_id = Column(String(60), ForeignKey('job_seekers.id'), nullable=False)
    recruiter_id = Column(String(60), ForeignKey('recruiters.id'), nullable=False)
    recruiter = relationship("Recruiter", backref="views")
    dateViewed = Column("dateViewed", String(128), default=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
