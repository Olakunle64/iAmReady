#!/usr/bin/python3
"""This module has the defintion of the Review class"""
from sqlalchemy import Column, String, Integer, ForeignKey
from models.parent_model import ParentModel, Base
from sqlalchemy.orm import relationship, backref


class Review(ParentModel, Base):
    """Review Class"""
    __tablename__ = 'reviews'
    description = Column("review", String(1024), nullable=False)
    rating = Column("rating", Integer, nullable=False)
    job_seeker_id = Column(String(60), ForeignKey('job_seekers.id'), nullable=False)

# added attr:
# rating
