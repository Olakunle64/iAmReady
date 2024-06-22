#!/usr/bin/python3
"""This module has the defintion of the User class"""

from sqlalchemy import Column, String
from sqlalchemy.orm import relationship, backref
from models.parent_model import ParentModel


class User(ParentModel):
    """This class has the defintion of the User class"""

    email = Column("email", String(128), nullable=False)
    password = Column("password", String(128), nullable=False)
    country = Column("country", String(128), nullable=False)
    city = Column("city", String(128), nullable=False)
    phoneNumber = Column("phoneNumber", String(128), nullable=False)
    address = Column("address", String(128), nullable=False)


# Note:
    # i added address attribute
