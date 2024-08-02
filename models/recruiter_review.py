#!/usr/bin/python3
"""This module has the defintion of the Review class for the recruiter"""
from sqlalchemy import Column, String, Integer, ForeignKey
from models.parent_model import ParentModel, Base
from sqlalchemy.orm import relationship, backref


class RecruiterReview(ParentModel, Base):
    """RecruiterReview Class"""
    __tablename__ = 'recruiter_reviews'
    description = Column("description", String(1024), nullable=False)
    rating = Column("rating", Integer, nullable=False)
    companyName = Column("companyName", String(128), nullable=False)
    recruiter_id = Column(String(60), ForeignKey('recruiters.id'), nullable=False)

# added attr:
# rating
