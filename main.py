#!/usr/bin/python3
"""get an instance of Recruiter class and store it to the database"""
from models.engine.db import DBStorage
from models.recruiter import Recruiter


recruiter = Recruiter(
    companyName="Google", companyDesc="Google is a tech company",
    websiteUrl="https://www.google.com", email="salau1998@gmail.com",
    password="password", country="Nigeria", city="Lagos",
    phoneNumber="08012345678", address="No 1, Google Street"
)
recruiter.save()
print(recruiter)
