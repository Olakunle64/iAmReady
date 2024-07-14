from api.v1.views import app_views
from flask import jsonify, request, abort
from models import storage
from models.job_seeker import JobSeeker
from models.job_seeker_info import JobSeekerInfo
from flask_login import login_required


@app_views.route('/job_seeker/job_seeker_info', methods=['POST'], strict_slashes=False)
@login_required
def create_job_seeker_info():
    """This method creates a job_seeker_info"""
    job_seeker = request.current_user
    must_attr = ['bio', 'jobName']
    for attr in must_attr:
        if attr not in request.get_json():
            return jsonify({'error': 'Missing attribute: ' + attr}), 400
    request.get_json()['job_seeker_id'] = job_seeker.id
    job_seeker_info = JobSeekerInfo(**request.get_json())
    job_seeker_info.save()
    return jsonify(job_seeker_info.to_dict()), 201


@app_views.route('/job_seeker/job_seeker_info', methods=['GET'], strict_slashes=False)
@login_required
def get_job_seeker_infos():
    """This method returns all the job_seeker_infos"""
    job_seeker = request.current_user
    job_seeker_info = job_seeker.jsInfo

    if job_seeker_info:
        return jsonify([
            [job_seeker_info.to_dict()]
        ])
    return jsonify([])

    # return jsonify([
    #     job_seeker_info.to_dict() for job_seeker_info in job_seeker.job_seeker_infos
    # ])


@app_views.route('/job_seeker/job_seeker_info', methods=['PUT'], strict_slashes=False)
@login_required
def update_job_seeker_info():
    """This method updates an job_seeker_info"""
    args = request.args
    if 'job_seeker_info_id' not in args:
        return jsonify({'error': 'Missing job_seeker_info_id'}), 400
    job_seeker_info = storage.get(JobSeekerInfo, args['job_seeker_info_id'])
    if job_seeker_info is None:
        abort(404)

    must_not_attr = ['id', 'created_at', 'updated_at']
    for key, value in request.get_json().items():
        if key not in must_not_attr:
            setattr(job_seeker_info, key, value)
    job_seeker_info.save()
    return jsonify(job_seeker_info.to_dict()), 200


@app_views.route('/job_seeker/job_seeker_info', methods=['DELETE'], strict_slashes=False)
@login_required
def delete_job_seeker_info():
    """This method deletes a job_seeker_info"""
    job_seeker = request.current_user

    args = request.args
    if 'job_seeker_info_id' not in args:
        return jsonify({'error': 'Missing job_seeker_info_id'}), 400
    job_seeker_info = storage.get(JobSeekerInfo, args['job_seeker_info_id'])
    if job_seeker_info is None:
        abort(404)
    storage.delete(job_seeker_info)
    storage.save()
    return jsonify({}), 200
