#!/usr/bin/python3
"""This module has the defintion of the Payment class"""
from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from models.parent_model import ParentModel, Base
from sqlalchemy.orm import relationship, backref


class Payment(ParentModel, Base):
    """Payment class"""
    __tablename__ = 'payments'
    amount = Column("amount", Integer, nullable=False)
    paid = Column("paid", Boolean, default=False)
    job_seeker_id = Column(String(60), ForeignKey('job_seekers.id'), nullable=False)

# added attr:
# amount