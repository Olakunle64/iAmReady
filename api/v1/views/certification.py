from api.v1.views import app_views
from flask import jsonify, request, abort
from models import storage
from models.job_seeker import JobSeeker
from models.certification import Certification



@app_views.route('/job_seeker/certification', methods=['POST'], strict_slashes=False)
def create_certification():
    """This method creates a certification"""
    job_seeker = request.current_user
    must_attr = ['title', 'issuingOrg', 'dateIssued']
    for attr in must_attr:
        if attr not in request.get_json():
            return jsonify({'error': 'Missing attribute: ' + attr}), 400
    request.get_json()['job_seeker_id'] = job_seeker.id
    certification = Certification(**request.get_json())
    certification.save()
    return jsonify(certification.to_dict()), 201


@app_views.route('/job_seeker/certification', methods=['GET'], strict_slashes=False)
def get_certifications():
    """This method returns all the certifications"""
    job_seeker = request.current_user

    return jsonify([
        certification.to_dict() for certification in job_seeker.certifications
    ])


@app_views.route('/job_seeker/certification', methods=['PUT'], strict_slashes=False)
def update_certification():
    """This method updates an certification"""
    args = request.args
    if 'certification_id' not in args:
        return jsonify({'error': 'Missing certification_id'}), 400
    certification = storage.get(Certification, args['certification_id'])
    if certification is None:
        abort(404)

    must_not_attr = ['id', 'created_at', 'updated_at']
    for key, value in request.get_json().items():
        if key not in must_not_attr:
            setattr(certification, key, value)
    certification.save()
    return jsonify(certification.to_dict()), 200


@app_views.route('/job_seeker/certification', methods=['DELETE'], strict_slashes=False)
def delete_certification():
    """This method deletes a certification"""
    job_seeker = request.current_user

    args = request.args
    if 'certification_id' not in args:
        return jsonify({'error': 'Missing certification_id'}), 400
    certification = storage.get(Certification, args['certification_id'])
    if certification is None:
        abort(404)
    storage.delete(certification)
    storage.save()
    return jsonify({}), 200
