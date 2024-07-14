from api.v1.views import app_views
from flask import jsonify, request, make_response, abort
from models import storage
from models.job_seeker import JobSeeker
from flask_login import current_user, login_required


@app_views.route('/register/job_seeker', methods=['POST'], strict_slashes=False)
def register_job_seeker():
    """This method registers a job seeker"""
    must_attr = ['firstName', 'email', 'country', 'lastName', 'password', 'city', 'skills']
    for attr in must_attr:
        if attr not in request.get_json():
            return jsonify({"error": "Missing attribute: " + attr}), 400

    if request.get_json().get("user_type") not in ["j"]:
        return jsonify({"error": "user_type must either be j"}), 400

    # check if skills is an array
    if not isinstance(request.get_json().get('skills'), list):
        return jsonify({"error": "skills must be an array"}), 400

    user = storage.find_user_by(JobSeeker, email=request.get_json().get('email'))
    if user:
        return jsonify({"error": "Email already exists"}), 400
    from api.v1.app import auth
    job_seeker = auth.register_user(JobSeeker, **request.get_json())
    return jsonify(job_seeker.to_dict()), 201


@app_views.route('/job_seeker', methods=['PUT'], strict_slashes=False)
@login_required
def update_job_seeker():
    """This method updates a job seeker"""
    job_seeker_id = current_user.id
    job_seeker = storage.get(JobSeeker, job_seeker_id)
    if job_seeker is None:
        abort(404)

    must_not_attr = ['id', 'created_at', 'updated_at', "password", 'user_type']
    for key, value in request.get_json().items():
        if key not in must_not_attr:
            setattr(job_seeker, key, value)
    job_seeker.save()
    return jsonify(job_seeker.to_dict()), 200


@app_views.route('/job_seeker', methods=['GET'], strict_slashes=False)
@login_required
def get_job_seeker():
    """This method gets a job seeker"""
    print(current_user.get_id())
    job_seeker_id = current_user.get_id()
    job_seeker = storage.get(JobSeeker, job_seeker_id)
    if job_seeker is None:
        abort(401)
    return jsonify(job_seeker.to_dict())


@app_views.route('/job_seeker', methods=['DELETE'], strict_slashes=False)
@login_required
def delete_job_seeker():
    """This method deletes a job seeker"""
    job_seeker_id = current_user.id
    job_seeker = storage.get(JobSeeker, job_seeker_id)
    storage.delete(job_seeker)
    storage.save()
    response = jsonify({})
    response.delete_cookie('session_id')
    response.delete_cookie('user_type')
    return response, 200


@app_views.route('/jobSeeker', methods=['GET'], strict_slashes=False)
@login_required
def full_job_seeker():
    """This method gets a job seeker"""
    job_seeker_id = current_user.get_id()
    job_seeker = storage.get(JobSeeker, job_seeker_id)
    if job_seeker is None:
        abort(401)
    payments = {}
    payment = job_seeker.payment
    if payment:
        payments = payment.to_dict()
    
    job_seeker_infos = {}
    job_seeker_info = job_seeker.jsInfo
    if job_seeker_info:
        job_seeker_infos = job_seeker_info.to_dict()

    return jsonify({
        "job_seeker": job_seeker.to_dict(),
        "education": [education.to_dict() for education in job_seeker.educations],
        "certification": [certification.to_dict() for certification in job_seeker.certifications],
        "experience": [experience.to_dict() for experience in job_seeker.experiences],
        "payment": payments,
        "portfolio": [portfolio.to_dict() for portfolio in job_seeker.portfolios],
        "review": [review.to_dict() for review in job_seeker.reviews],
        "view": [view.to_dict() for view in job_seeker.views],
        "jobSeekerInfo": job_seeker_infos
    })
    # return jsonify(job_seeker.to_dict())
