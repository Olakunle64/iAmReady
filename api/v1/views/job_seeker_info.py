from api.v1.views import app_views
from flask import jsonify, request
from models import storage
from models.job_seeker import JobSeeker
from models.job_seeker_info import JobSeekerInfo


@app_views.route('/job_seeker/job_seeker_info', methods=['GET', 'POST', 'DELETE'], strict_slashes=False)
def job_seeker_info():
    """This method returns all the job_seeker_infos"""
    args = request.args
    if 'job_seeker_id' in args:
        job_seeker = storage.get(JobSeeker, args['job_seeker_id'])
        if job_seeker is None:
            return jsonify({'error': 'JobSeeker not found'}), 404

        if request.method == 'GET':
            return jsonify([
                job_seeker_info.to_dict() for job_seeker_info in job_seeker.job_seeker_infos
            ])

        if request.method == 'DELETE':
            for job_seeker_info in job_seeker.job_seeker_infos:
                storage.delete(job_seeker_info)
            storage.save()
            return jsonify({}), 200

        if request.method == 'POST':
            must_attr = ['bio', 'jobName']
            for attr in must_attr:
                if attr not in request.get_json():
                    return jsonify({'error': 'Missing attribute: ' + attr}), 400
            request.get_json()['job_seeker_id'] = job_seeker.id
            job_seeker_info = JobSeekerInfo(**request.get_json())
            job_seeker_info.save()
            return jsonify(job_seeker_info.to_dict()), 201
    else:
        return jsonify({'error': 'Missing job_seeker_id'}), 400


@app_views.route('/job_seeker_info', methods=['GET', 'PUT', 'DELETE'], strict_slashes=False)
def job_seeker_infos():
    """This method returns all the job_seeker_infos"""
    args = request.args
    if 'job_seeker_info_id' not in args:
        return jsonify({'error': 'Missing job_seeker_info_id'}), 400
    job_seeker_info = storage.get(JobSeekerInfo, args['job_seeker_info_id'])
    if job_seeker_info is None:
        return jsonify({'error': 'JobSeekerInfo not found'}), 404

    if request.method == 'GET':
        return jsonify(job_seeker_info.to_dict())

    if request.method == 'DELETE':
        storage.delete(job_seeker_info)
        storage.save()
        return jsonify({}), 200

    if request.method == 'PUT':
        must_not_attr = ['id', 'created_at', 'updated_at']
        for key, value in request.get_json().items():
            if key not in must_not_attr:
                setattr(job_seeker_info, key, value)
        job_seeker_info.save()
        return jsonify(job_seeker_info.to_dict()), 200