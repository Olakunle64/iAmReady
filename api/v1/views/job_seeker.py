from api.v1.views import app_views
from flask import jsonify, request, make_response, abort
from models import storage
from models.job_seeker import JobSeeker


@app_views.route('/register/job_seeker', methods=['POST'], strict_slashes=False)
def register_job_seeker():
    """This method registers a job seeker"""
    must_attr = ['user_type', 'firstName', 'email', 'country', 'lastName', 'password', 'city', 'skills']
    for attr in must_attr:
        if attr not in request.get_json():
            return jsonify({"error": "Missing attribute: " + attr}), 400

    # check if skills is an array
    if not isinstance(request.get_json().get('skills'), list):
        return jsonify({"error": "skills must be an array"}), 400
    if request.get_json().get("user_type") not in ["j", "r"]:
        return jsonify({"error": "user_type must either be j or r"}), 400

    user = storage.find_user_by(JobSeeker, email=request.get_json().get('email'))
    if user:
        return jsonify({"error": "Email already exists"}), 400
    from api.v1.app import auth
    job_seeker = auth.register_user(JobSeeker, **request.get_json())
    return jsonify(job_seeker.to_dict()), 201


@app_views.route('/job_seeker', methods=['PUT'], strict_slashes=False)
def update_job_seeker():
    """This method updates a job seeker"""
    job_seeker_id = request.current_user.id
    job_seeker = storage.get(JobSeeker, job_seeker_id)
    if job_seeker is None:
        abort(404)

    must_not_attr = ['id', 'created_at', 'updated_at']
    for key, value in request.get_json().items():
        if key not in must_not_attr:
            setattr(job_seeker, key, value)
    job_seeker.save()
    return jsonify(job_seeker.to_dict()), 200


@app_views.route('/job_seeker', methods=['GET'], strict_slashes=False)
def get_job_seeker():
    """This method gets a job seeker"""
    job_seeker_id = request.current_user.id
    job_seeker = storage.get(JobSeeker, job_seeker_id)
    if job_seeker is None:
        abort(401)
    return jsonify(job_seeker.to_dict())


@app_views.route('/job_seeker', methods=['DELETE'], strict_slashes=False)
def delete_job_seeker():
    """This method deletes a job seeker"""
    job_seeker_id = request.current_user.id
    job_seeker = storage.get(JobSeeker, job_seeker_id)
    storage.delete(job_seeker)
    storage.save()
    response = jsonify({})
    response.delete_cookie('session_id')
    response.delete_cookie('user_type')
    return response, 200