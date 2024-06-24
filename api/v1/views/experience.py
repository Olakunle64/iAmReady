from api.v1.views import app_views
from flask import jsonify, request
from models import storage
from models.job_seeker import JobSeeker
from models.experience import Experience


@app_views.route('/job_seeker/experience', methods=['GET', 'POST', 'DELETE'], strict_slashes=False)
def job_seeker_experience():
    """This method returns all the experiences"""
    args = request.args
    if 'job_seeker_id' in args:
        job_seeker = storage.get(JobSeeker, args['job_seeker_id'])
        if job_seeker is None:
            return jsonify({'error': 'JobSeeker not found'}), 404

        if request.method == 'GET':
            return jsonify([
                experience.to_dict() for experience in job_seeker.experiences
            ])

        if request.method == 'DELETE':
            for experience in job_seeker.experiences:
                storage.delete(experience)
            storage.save()
            return jsonify({}), 200

        if request.method == 'POST':
            must_attr = ['company', 'description', 'startDate', 'endDate']
            for attr in must_attr:
                if attr not in request.get_json():
                    return jsonify({'error': 'Missing attribute: ' + attr}), 400
            request.get_json()['job_seeker_id'] = job_seeker.id
            experience = Experience(**request.get_json())
            experience.save()
            return jsonify(experience.to_dict()), 201
    else:
        return jsonify({'error': 'Missing job_seeker_id'}), 400


@app_views.route('/experience', methods=['GET', 'PUT', 'DELETE'], strict_slashes=False)
def experiences():
    """This method returns all the experiences"""
    args = request.args
    if 'experience_id' not in args:
        return jsonify({'error': 'Missing experience_id'}), 400
    experience = storage.get(Experience, args['experience_id'])
    if experience is None:
        return jsonify({'error': 'Experience not found'}), 404

    if request.method == 'GET':
        return jsonify(experience.to_dict())

    if request.method == 'DELETE':
        storage.delete(experience)
        storage.save()
        return jsonify({}), 200

    if request.method == 'PUT':
        must_not_attr = ['id', 'created_at', 'updated_at']
        for key, value in request.get_json().items():
            if key not in must_not_attr:
                setattr(experience, key, value)
        experience.save()
        return jsonify(experience.to_dict()), 200