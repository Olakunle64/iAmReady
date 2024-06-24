from api.v1.views import app_views
from flask import jsonify, request
from models import storage
from models.job_seeker import JobSeeker
from models.certification import Certification


@app_views.route('/job_seeker/certification', methods=['GET', 'POST', 'DELETE'], strict_slashes=False)
def job_seeker_certification():
    """This method returns all the certifications"""
    args = request.args
    if 'job_seeker_id' in args:
        job_seeker = storage.get(JobSeeker, args['job_seeker_id'])
        if job_seeker is None:
            return jsonify({'error': 'JobSeeker not found'}), 404

        if request.method == 'GET':
            return jsonify([
                certification.to_dict() for certification in job_seeker.certifications
            ])

        if request.method == 'DELETE':
            for certification in job_seeker.certifications:
                storage.delete(certification)
            storage.save()
            return jsonify({}), 200

        if request.method == 'POST':
            must_attr = ['title', 'issuingOrg', 'dateIssued']
            for attr in must_attr:
                if attr not in request.get_json():
                    return jsonify({'error': 'Missing attribute: ' + attr}), 400
            request.get_json()['job_seeker_id'] = job_seeker.id
            certification = Certification(**request.get_json())
            certification.save()
            return jsonify(certification.to_dict()), 201
    else:
        return jsonify({'error': 'Missing job_seeker_id'}), 400


@app_views.route('/certification', methods=['GET', 'PUT', 'DELETE'], strict_slashes=False)
def certifications():
    """This method returns all the certifications"""
    args = request.args
    if 'certification_id' not in args:
        return jsonify({'error': 'Missing certification_id'}), 400
    certification = storage.get(Certification, args['certification_id'])
    if certification is None:
        return jsonify({'error': 'Certification not found'}), 404

    if request.method == 'GET':
        return jsonify(certification.to_dict())

    if request.method == 'DELETE':
        storage.delete(certification)
        storage.save()
        return jsonify({}), 200

    if request.method == 'PUT':
        must_not_attr = ['id', 'created_at', 'updated_at']
        for key, value in request.get_json().items():
            if key not in must_not_attr:
                setattr(certification, key, value)
        certification.save()
        return jsonify(certification.to_dict()), 200