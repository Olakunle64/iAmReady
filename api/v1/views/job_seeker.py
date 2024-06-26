from api.v1.views import app_views
from flask import jsonify, request
from models import storage
from models.job_seeker import JobSeeker
from flasgger import swag_from



@app_views.route('/job_seeker', methods=['GET', 'POST', 'DELETE'], strict_slashes=False)
# @swag_from('job_seeker.yml')
def job_seekers():
    """This method returns all the job_seekers"""
    job_seeker_id = request.args.get('job_seeker_id')
    if not job_seeker_id:
        if request.method == 'POST':
            must_attr = ['firstName', 'email', 'country', 'lastName', 'password', 'city', 'skills']
            for attr in must_attr:
                if attr not in request.get_json():
                    return jsonify({"error": "Missing attribute: " + attr}), 400

            # check if skills is an array
            if not isinstance(request.get_json().get('skills'), list):
                return jsonify({"error": "skills must be an array"}), 400

            if storage.check_attr_val(JobSeeker, 'email', request.get_json().get('email')):
                return jsonify({"error": "Email already exists"}), 400
            job_seeker = JobSeeker(**request.get_json())
            job_seeker.save()
            return jsonify(job_seeker.to_dict()), 201

        if request.method == 'GET':
            job_seekers = storage.all(JobSeeker)
            return jsonify([job_seeker.to_dict() for job_seeker in job_seekers.values()])

    job_seeker = storage.get(JobSeeker, job_seeker_id)
    if job_seeker is None:
        return jsonify({"error": "Not found"}), 404

    if request.method == 'GET':
        return jsonify(job_seeker.to_dict())

    if request.method == 'DELETE':
        storage.delete(job_seeker)
        storage.save()
        return jsonify({}), 200

    if request.method == 'PUT':
        must_not_attr = ['id', 'created_at', 'updated_at']
        for key, value in request.get_json().items():
            if key not in must_not_attr:
                setattr(job_seeker, key, value)
        job_seeker.save()
        return jsonify(job_seeker.to_dict()), 200
