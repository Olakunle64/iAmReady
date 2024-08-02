from api.v1.views import app_views
from flask import jsonify, request, abort
from models import storage
from models.job_seeker import JobSeeker
from models.experience import Experience



@app_views.route('/job_seeker/experience', methods=['POST'], strict_slashes=False)
def create_experience():
    """This method creates a experience"""
    job_seeker = request.current_user
    must_attr = ['company', 'description', 'startDate', 'endDate']
    for attr in must_attr:
        if attr not in request.get_json():
            return jsonify({'error': 'Missing attribute: ' + attr}), 400
    request.get_json()['job_seeker_id'] = job_seeker.id
    experience = Experience(**request.get_json())
    experience.save()
    return jsonify(experience.to_dict()), 201


@app_views.route('/job_seeker/experience', methods=['GET'], strict_slashes=False)
def get_experiences():
    """This method returns all the experiences"""
    job_seeker = request.current_user

    return jsonify([
        experience.to_dict() for experience in job_seeker.experiences
    ])


@app_views.route('/job_seeker/experience', methods=['PUT'], strict_slashes=False)
def update_experience():
    """This method updates an experience"""
    args = request.args
    if 'experience_id' not in args:
        return jsonify({'error': 'Missing experience_id'}), 400
    experience = storage.get(Experience, args['experience_id'])
    if experience is None:
        abort(404)

    must_not_attr = ['id', 'created_at', 'updated_at', "__class__"]
    for key, value in request.get_json().items():
        if key not in must_not_attr:
            setattr(experience, key, value)
    experience.save()
    return jsonify(experience.to_dict()), 200


@app_views.route('/job_seeker/experience', methods=['DELETE'], strict_slashes=False)
def delete_experience():
    """This method deletes a experience"""
    job_seeker = request.current_user

    args = request.args
    if 'experience_id' not in args:
        return jsonify({'error': 'Missing experience_id'}), 400
    experience = storage.get(Experience, args['experience_id'])
    if experience is None:
        abort(404)
    storage.delete(experience)
    storage.save()
    return jsonify({}), 200
