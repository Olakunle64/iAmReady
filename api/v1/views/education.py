from api.v1.views import app_views
from flask import jsonify, request, abort
from models import storage
from models.job_seeker import JobSeeker
from models.education import Education
from flask_login import login_required, current_user



@app_views.route('/job_seeker/education', methods=['POST'], strict_slashes=False)
@login_required
def create_education():
    """This method creates a education"""
    job_seeker = current_user
    must_attr = ['school', 'degree', 'fieldOfStudy', 'startDate', 'endDate']
    for attr in must_attr:
        if attr not in request.get_json():
            return jsonify({'error': 'Missing attribute: ' + attr}), 400
    request.get_json()['job_seeker_id'] = job_seeker.id
    education = Education(**request.get_json())
    education.save()
    return jsonify(education.to_dict()), 201


@app_views.route('/job_seeker/education', methods=['GET'], strict_slashes=False)
@login_required
def get_educations():
    """This method returns all the educations"""
    job_seeker = current_user

    return jsonify([
        education.to_dict() for education in job_seeker.educations
    ])


@app_views.route('/job_seeker/education', methods=['PUT'], strict_slashes=False)
@login_required
def update_education():
    """This method updates an education"""
    args = request.args
    if 'education_id' not in args:
        return jsonify({'error': 'Missing education_id'}), 400
    education = storage.get(Education, args['education_id'])
    if education is None:
        abort(404)

    must_not_attr = ['id', 'created_at', 'updated_at']
    for key, value in request.get_json().items():
        if key not in must_not_attr:
            setattr(education, key, value)
    education.save()
    return jsonify(education.to_dict()), 200


@app_views.route('/job_seeker/education', methods=['DELETE'], strict_slashes=False)
@login_required
def delete_education():
    """This method deletes a education"""
    job_seeker = current_user

    args = request.args
    if 'education_id' not in args:
        return jsonify({'error': 'Missing education_id'}), 400
    education = storage.get(Education, args['education_id'])
    if education is None:
        abort(404)
    storage.delete(education)
    storage.save()
    return jsonify({}), 200
