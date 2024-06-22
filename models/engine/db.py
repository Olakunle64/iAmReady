#!/usr/bin/python3
"""This module defines the class to manage database storage for the
    TutorPlan website
"""
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from models.parent_model import Base
from models.recruiter import Recruiter
from models.job_seeker import JobSeeker
from models.experience import Experience
from models.education import Education
from models.payment import Payment
from models.portfolio import Portfolio
from models.certification import Certification
from models.review import Review
from models.job_seeker_info import JobSeekerInfo
from models.view import View


ValidClasses = [Recruiter, JobSeeker, Experience,
                Education, Payment, Portfolio,
                Certification, Review, JobSeekerInfo, View
            ]

classes = {
    "Recruiter": Recruiter,
    "JobSeeker": JobSeeker,
    "Experience": Experience,
    "Education": Education,
    "Payment": Payment,
    "Portfolio": Portfolio,
    "Certification": Certification,
    "Review": Review,
    "JobSeekerInfo": JobSeekerInfo,
    "View": View
}


class DBStorage():
    """This class is use to handle the PostgreSQL database for the
        iAmReady website.

        Private class attributes:
            __engine: set to None
            __session: set to None

        Public instance methods:
            __init__:
            reload:
            new:
            save:
            delete:
            all:
    """
    __engine = None
    __session = None

    def __init__(self):
        """create an instance of engine with self.__engine and link it to
            the PostgreSQL database
            dialect: postgresql
            driver: psycopg2
        """
        # retrieve all environment variables that are necessary to
        # connect to the TutorPlan PostgreSQL server
        USER = os.getenv("iAmReady_PG_USER", "iamready_dev")
        PASWD = os.getenv("iAmReady_PG_PWD", "iamready_dev_pwd")
        HOST = os.getenv("iAmReady_PG_HOST", "localhost")
        DB = os.getenv("iAmReady_PG_DB", "iamready_dev")
        PORT = os.getenv("iAmReady_PG_PORT", "5432")

        # create an instance of create_engine that links to
        # the TutorPlan PostgreSQL server
        self.__engine = create_engine(
                'postgresql+psycopg2://{}:{}@{}:{}/{}'.format(USER, PASWD, HOST, PORT, DB),
                pool_pre_ping=True
                )

        # drop all tables if the TUTORPLAN_ENV is "test"
        if os.getenv("iAmReady_ENV") == "test":
            Base.metadata.drop_all(self.__engine)

    def reload(self):
        """Create all tables in the database and enable the self.__session"""
        Base.metadata.create_all(self.__engine)
        session_factory = sessionmaker(
                bind=self.__engine,
                expire_on_commit=False
                )
        self.__session = scoped_session(session_factory)

    def new(self, obj):
        """add an object to the database"""
        self.__session.add(obj)

    def save(self):
        """commit all updates to the database with the current session"""
        self.__session.commit()

    def delete(self, obj=None):
        """delete an object from the database if obj is not None"""
        if obj:
            self.__session.delete(obj)

    def all(self, cls=None):
        """return all objects of each class, otherwise
            return objects that belong to cls if it's not None
        """
        objs_dict = {}
        if cls in ValidClasses:
            for obj in self.__session.query(cls).all():
                key = "{}.{}".format(obj.__class__.__name__, obj.id)
                objs_dict[key] = obj
        else:
            for table in Base.registry._class_registry.values():
                if hasattr(table, "__table__"):
                    for obj in self.__session.query(table).all():
                        key = "{}.{}".format(obj.__class__.__name__, obj.id)
                        objs_dict[key] = obj
        return objs_dict

    def close(self):
        """close the current session"""
        self.__session.remove()

    def get(self, cls, id):
        """retrieve an object with the specified cls and id"""
        if cls in classes.values():
            all_cls = self.all(cls)
            for key, value in classes.items():
                if value == cls:
                    key1 = "{}.{}".format(key, id)
                    obj_found = all_cls.get(key1)
                    if obj_found:
                        return obj_found
                    else:
                        return None
        else:
            return None

    def count(self, cls=None):
        """count the number of objects in storage that belong to cls"""
        count = 0
        if cls in classes.values():
            all_cls = self.all(cls)
        else:
            all_cls = self.all()
        for key in all_cls.keys():
            count += 1
        return count
