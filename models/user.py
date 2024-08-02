#!/usr/bin/python3
"""This module has the defintion of the User class"""

from sqlalchemy import Column, String, LargeBinary
from sqlalchemy.orm import relationship, backref
from models.parent_model import ParentModel


class User(ParentModel):
    """This class has the defintion of the User class"""
    email = Column("email", String(128), nullable=False, unique=True)
    password = Column("password", LargeBinary, nullable=False)
    country = Column("country", String(128), nullable=False)
    city = Column("city", String(128), nullable=False)
    phoneNumber = Column("phoneNumber", String(128), nullable=True)
    linkedIn = Column("linkedIn", String(128), nullable=True)
    address = Column("address", String(128), nullable=True)
    reset_token_id = Column("reset_token_id", String(128), nullable=True)


# Note:
    # i added address attribute
