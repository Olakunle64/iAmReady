#!/usr/bin/python3
"""This module has the defintion of the Recruiter class"""
from sqlalchemy import Column, String
from models.user import User
from models.parent_model import ParentModel, Base
from sqlalchemy.orm import relationship, backref
from flask_login import UserMixin


class Recruiter(User, Base, UserMixin):
    """Recuriter class"""
    __tablename__ = 'recruiters'
    companyName = Column(String(128), nullable=False)
    companyDesc = Column(String(1024), nullable=False)
    websiteUrl = Column(String(104), nullable=True)
    reviews = relationship("RecruiterReview", backref="recruiter", cascade="all, delete")
