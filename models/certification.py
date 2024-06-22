#!/usr/bin/python3
"""This module has the defintion of the Certification class"""
from sqlalchemy import Column, String, ForeignKey
from models.parent_model import ParentModel, Base
from sqlalchemy.orm import relationship, backref


class Certification(ParentModel, Base):
    """Certification class"""
    __tablename__ = 'certifications'
    title = Column("title", String(128), nullable=False)
    job_seeker_id = Column(String(60), ForeignKey('job_seekers.id'), nullable=False)
    issuingOrg = Column("issuingOrg", String(128), nullable=False)
    dateIssued = Column("dateIssued", String(128), nullable=False)
