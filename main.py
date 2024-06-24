#!/usr/bin/python3
"""get an instance of Recruiter class and store it to the database"""
from models.engine.db import DBStorage
from models.recruiter import Recruiter
from models.job_seeker import JobSeeker
from models.education import Education
from models.certification import Certification
from models.experience import Experience
from models.portfolio import Portfolio
from models.payment import Payment
from models.review import Review
from models.job_seeker_info import JobSeekerInfo
from models.view import View

from datetime import datetime as Datetime



recruiter = Recruiter(
    companyName="Google", companyDesc="Google is a tech company",
    websiteUrl="https://www.google.com", email="salau1998@gmail.com",
    password="password", country="Nigeria", city="Lagos",
    phoneNumber="08012345678", address="No 1, Google Street"
)
recruiter.save()
job_seeker = JobSeeker(
    firstName="Salau", lastName="Akeem", email="salau1998", password="password",
    country="Nigeria", city="Lagos", phoneNumber="08012345678",
    address="No 1, Google Street", title="Software Engineer", skills=["Python", "Java", "C++"]
)
job_seeker.save()
education = Education(
    school="University of Lagos", degree="B.Sc", fieldOfStudy="Computer Science",
    startDate=Datetime.now(), endDate=Datetime.now(), job_seeker_id=job_seeker.id
)
education.save()
certification = Certification(
    title="AWS Certified Solutions Architect", issuingOrg="Amazon", dateIssued=Datetime.now(),
    job_seeker_id=job_seeker.id
)
certification.save()
experience = Experience(
    title="Software Engineer", company="Google", location="Lagos",
    startDate=Datetime.now(), endDate=Datetime.now(), job_seeker_id=job_seeker.id,
    description="I am a software engineer"
)
experience.save()
portfolio = Portfolio(
    title="Portfolio", description="My portfolio", link="https://www.google.com",
    job_seeker_id=job_seeker.id
)
portfolio.save()
payment = Payment(
    amount=5000, job_seeker_id=job_seeker.id, paid=True
)
payment.save()
review = Review(
    rating=5, description="Good job", job_seeker_id=job_seeker.id
)
review.save()
job_seeker_info = JobSeekerInfo(
    job_seeker_id=job_seeker.id, jobName="Software Engineer", resume="My resume",
    bio="I am a software engineer", salaryRange=5000
)
job_seeker_info.save()
view = View(
    job_seeker_id=job_seeker.id, companyName="Google", dateViewed=Datetime.now().isoformat(), recruiter_id=recruiter.id
)
view.save()

print(recruiter)
print(job_seeker)
print(education)
