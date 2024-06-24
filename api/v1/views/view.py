from api.v1.views import app_views
from flask import jsonify, request
from models import storage
from models.job_seeker import JobSeeker
from models.view import View


@app_views.route('/job_seeker/view', methods=['GET', 'POST', 'DELETE'], strict_slashes=False)
def job_seeker_view():
    """This method returns all the views"""
    args = request.args
    if 'job_seeker_id' in args:
        job_seeker = storage.get(JobSeeker, args['job_seeker_id'])
        if job_seeker is None:
            return jsonify({'error': 'JobSeeker not found'}), 404

        if request.method == 'GET':
            return jsonify([
                view.to_dict() for view in job_seeker.views
            ])

        if request.method == 'DELETE':
            for view in job_seeker.views:
                storage.delete(view)
            storage.save()
            return jsonify({}), 200

        if request.method == 'POST':
            must_attr = ['recruiter_id']
            for attr in must_attr:
                if attr not in request.get_json():
                    return jsonify({'error': 'Missing attribute: ' + attr}), 400
            request.get_json()['job_seeker_id'] = job_seeker.id
            view = View(**request.get_json())
            view.save()
            return jsonify(view.to_dict()), 201
    else:
        return jsonify({'error': 'Missing job_seeker_id'}), 400


@app_views.route('/view', methods=['GET', 'PUT', 'DELETE'], strict_slashes=False)
def views():
    """This method returns all the views"""
    args = request.args
    if 'view_id' not in args:
        return jsonify({'error': 'Missing view_id'}), 400
    view = storage.get(View, args['view_id'])
    if view is None:
        return jsonify({'error': 'View not found'}), 404

    if request.method == 'GET':
        return jsonify(view.to_dict())

    if request.method == 'DELETE':
        storage.delete(view)
        storage.save()
        return jsonify({}), 200

    if request.method == 'PUT':
        must_not_attr = ['id', 'created_at', 'updated_at']
        for key, value in request.get_json().items():
            if key not in must_not_attr:
                setattr(view, key, value)
        view.save()
        return jsonify(view.to_dict()), 200