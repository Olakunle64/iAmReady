from api.v1.views import app_views
from flask import jsonify
from models import storage
from models.job_seeker import JobSeeker
from models.certification import Certification
from models.education import Education
from models.experience import Experience
from models.job_seeker import JobSeeker
from models.recruiter import Recruiter
from models.job_seeker_info import JobSeekerInfo
from models.view import View
from models.payment import Payment
from models.review import Review
from models.recruiter_review import RecruiterReview
from models.portfolio import Portfolio



@app_views.route('/certifications', methods=['GET'], strict_slashes=False)
def get_all_certifications():
    """This method returns all the certifications"""
    certifications = storage.all(Certification).values()
    return jsonify([certification.to_dict() for certification in certifications])


@app_views.route('/views', methods=['GET'], strict_slashes=False)
def get_all_views():
    """This method returns all the views"""
    views = storage.all(View).values()
    return jsonify([view.to_dict() for view in views])


@app_views.route('/reviews', methods=['GET'], strict_slashes=False)
def get_all_reviews():
    """This method returns all the reviews"""
    reviews = storage.all(Review).values()
    return jsonify([review.to_dict() for review in reviews])

@app_views.route('/job_seekers', methods=['GET'], strict_slashes=False)
def get__all_job_seekers():
    """This method returns all the job_seekers"""
    job_seekers = storage.all(JobSeeker).values()
    return jsonify([job_seeker.to_dict() for job_seeker in job_seekers])


@app_views.route('/educations', methods=['GET'], strict_slashes=False)
def get_all_educations():
    """This method returns all the educations"""
    educations = storage.all(Education).values()
    return jsonify([education.to_dict() for education in educations])


@app_views.route('/experiences', methods=['GET'], strict_slashes=False)
def get_all_experiences():
    """This method returns all the experiences"""
    experiences = storage.all(Experience).values()
    return jsonify([experience.to_dict() for experience in experiences])


@app_views.route('/job_seeker_infos', methods=['GET'], strict_slashes=False)
def get_all_job_seeker_infos():
    """This method returns all the job_seeker_infos"""
    job_seeker_infos = storage.all(JobSeekerInfo).values()
    return jsonify([job_seeker_info.to_dict() for job_seeker_info in job_seeker_infos])


@app_views.route('/recruiters', methods=['GET'], strict_slashes=False)
def get_all_recruiters():
    """This method returns all the recruiters"""
    recruiters = storage.all(Recruiter).values()
    return jsonify([recruiter.to_dict() for recruiter in recruiters])


@app_views.route('/recruiter_reviews', methods=['GET'], strict_slashes=False)
def get_all_recruiter_reviews():
    """This method returns all the recruiter_reviews"""
    recruiter_reviews = storage.all(RecruiterReview).values()
    return jsonify([recruiter_review.to_dict() for recruiter_review in recruiter_reviews])


@app_views.route('/payments', methods=['GET'], strict_slashes=False)
def get_all_payments():
    """This method returns all the payments"""
    payments = storage.all(Payment).values()
    return jsonify([payment.to_dict() for payment in payments])


@app_views.route('/portfolios', methods=['GET'], strict_slashes=False)
def get_all_portfolios():
    """This method returns all the portfolios"""
    portfolios = storage.all(Portfolio).values()
    return jsonify([portfolio.to_dict() for portfolio in portfolios])


