#!/usr/bin/python3
"""This module has the defintion of the Portfolio class"""

from sqlalchemy import Column, String, ForeignKey
from models.parent_model import ParentModel, Base
from sqlalchemy.orm import relationship, backref


class Portfolio(ParentModel, Base):
    """Portfolio project class"""
    __tablename__ = 'portfolios'
    description = Column("description", String(1024), nullable=False)
    title = Column("title", String(128), nullable=False)
    link = Column("link", String(128), nullable=True)
    job_seeker_id = Column(String(60), ForeignKey('job_seekers.id'), nullable=False)