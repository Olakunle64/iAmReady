from api.v1.views import app_views
from flask import jsonify, request, abort
from models import storage
from models.job_seeker import JobSeeker
from models.recruiter import Recruiter
from models.view import View
from flask_login import login_required, current_user



@app_views.route('/job_seeker/view', methods=['POST'], strict_slashes=False)
@login_required
def create_view():
    """This method creates a view"""
    job_seeker = current_user
    must_attr = ['recruiter_id']
    for attr in must_attr:
        if attr not in request.get_json():
            return jsonify({'error': 'Missing attribute: ' + attr}), 400
    
    # check if the recruiter exists
    recruiter = storage.get(Recruiter, request.get_json()['recruiter_id'])
    if recruiter is None:
        abort(404)
    request.get_json()['job_seeker_id'] = job_seeker.id
    view = View(**request.get_json())
    view.save()
    return jsonify(view.to_dict()), 201


@app_views.route('/job_seeker/view', methods=['GET'], strict_slashes=False)
@login_required
def get_views():
    """This method returns all the views"""
    job_seeker = current_user

    return jsonify([
        view.to_dict() for view in job_seeker.views
    ])


@app_views.route('/job_seeker/view', methods=['PUT'], strict_slashes=False)
@login_required
def update_view():
    """This method updates an view"""
    args = request.args
    if 'view_id' not in args:
        return jsonify({'error': 'Missing view_id'}), 400
    view = storage.get(View, args['view_id'])
    if view is None:
        abort(404)

    must_not_attr = ['id', 'created_at', 'updated_at']
    for key, value in request.get_json().items():
        if key not in must_not_attr:
            setattr(view, key, value)
    view.save()
    return jsonify(view.to_dict()), 200


@app_views.route('/job_seeker/view', methods=['DELETE'], strict_slashes=False)
@login_required
def delete_view():
    """This method deletes a view"""
    job_seeker = current_user

    args = request.args
    if 'view_id' not in args:
        return jsonify({'error': 'Missing view_id'}), 400
    view = storage.get(View, args['view_id'])
    if view is None:
        abort(404)
    storage.delete(view)
    storage.save()
    return jsonify({}), 200
