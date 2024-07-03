from api.v1.views import app_views
from flask import jsonify
from models import storage
from models.recruiter import Recruiter
from models.job_seeker import JobSeeker
from models.education import Education
from datetime import datetime as Datetime
from models.view import View
from models.certification import Certification
from models.experience import Experience
from models.job_seeker_info import JobSeekerInfo
from models.portfolio import Portfolio
from models.review import Review
from models.payment import Payment
from models.recruiter_review import RecruiterReview


@app_views.route('/stats', methods=['GET'], strict_slashes=False)
def stats():
    """This method returns the count of all the classes"""
    classes = {
        "recruiters": Recruiter,
        "job_seekers": JobSeeker,
        "educations": Education,
        "views": View,
        "certifications": Certification,
        "experiences": Experience,
        "job_seeker_infos": JobSeekerInfo,
        "portfolios": Portfolio,
        "reviews": Review,
        "payments": Payment,
        "recruiter_reviews": RecruiterReview
    }
    count = {}
    for key, value in classes.items():
        count[key] = storage.count(value)
    return jsonify(count)


@app_views.route('/status', methods=['GET'], strict_slashes=False)
def status():
    """This method returns the status of the API"""
    return jsonify({"status": "OK"})