from api.v1.views import app_views
from flask import jsonify, request
from models import storage
from models.job_seeker import JobSeeker
from models.education import Education


@app_views.route('/job_seeker/education', methods=['GET', 'POST', 'DELETE'], strict_slashes=False)
def job_seeker_education():
    """This method returns all the educations"""
    args = request.args
    if 'job_seeker_id' in args:
        job_seeker = storage.get(JobSeeker, args['job_seeker_id'])
        if job_seeker is None:
            return jsonify({'error': 'JobSeeker not found'}), 404

        if request.method == 'GET':
            return jsonify([
                education.to_dict() for education in job_seeker.educations
            ])

        if request.method == 'DELETE':
            for education in job_seeker.educations:
                storage.delete(education)
            storage.save()
            return jsonify({}), 200

        if request.method == 'POST':
            must_attr = ['school', 'degree', 'fieldOfStudy',
                         'startDate', 'endDate'
                    ]
            for attr in must_attr:
                if attr not in request.get_json():
                    return jsonify({'error': 'Missing attribute: ' + attr}), 400
            # Handle the case where endDate and startDate is not in the correct format
            request.get_json()['job_seeker_id'] = job_seeker.id
            education = Education(**request.get_json())
            education.save()
            return jsonify(education.to_dict()), 201
    else:
        return jsonify({'error': 'Missing job_seeker_id'}), 400


@app_views.route('/education', methods=['GET', 'PUT', 'DELETE'], strict_slashes=False)
def educations():
    """This method returns all the educations"""
    args = request.args
    if 'education_id' not in args:
        return jsonify({'error': 'Missing education_id'}), 400
    education = storage.get(Education, args['education_id'])
    if education is None:
        return jsonify({'error': 'Education not found'}), 404

    if request.method == 'GET':
        return jsonify(education.to_dict())

    if request.method == 'DELETE':
        storage.delete(education)
        storage.save()
        return jsonify({}), 200

    if request.method == 'PUT':
        must_not_attr = ['id', 'created_at', 'updated_at']
        for key, value in request.get_json().items():
            if key not in must_not_attr:
                setattr(education, key, value)
        education.save()
        return jsonify(education.to_dict()), 200