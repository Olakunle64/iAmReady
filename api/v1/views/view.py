from api.v1.views import app_views
from flask import jsonify, request, abort
from models import storage
from models.job_seeker import JobSeeker
from models.recruiter import Recruiter
from models.view import View



@app_views.route('/job_seeker/view', methods=['POST'], strict_slashes=False)
def create_view():
    """This method creates a view"""
    recruiter = request.current_user
    must_attr = ['job_seeker_id']
    for attr in must_attr:
        if attr not in request.get_json():
            return jsonify({'error': 'Missing attribute: ' + attr}), 400
    
    # check if the job seeker exists
    job_seeker = storage.get(JobSeeker, request.get_json().get("job_seeker_id"))
    if job_seeker is None:
        abort(404)
    request.get_json()['recruiter_id'] = recruiter.id
    request.get_json()['companyName'] = recruiter.companyName
    request.get_json()['companyDesc'] = recruiter.companyDesc
    view = View(**request.get_json())
    view.save()
    return jsonify(view.to_dict()), 201


@app_views.route('/job_seeker/view', methods=['GET'], strict_slashes=False)
def get_views():
    """This method returns all the views"""
    job_seeker = request.current_user

    return jsonify([
        view.to_dict() for view in job_seeker.views
    ])


@app_views.route('/job_seeker/view', methods=['PUT'], strict_slashes=False)
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
def delete_view():
    """This method deletes a view"""
    job_seeker = request.current_user

    args = request.args
    if 'view_id' not in args:
        return jsonify({'error': 'Missing view_id'}), 400
    view = storage.get(View, args['view_id'])
    if view is None:
        abort(404)
    storage.delete(view)
    storage.save()
    return jsonify({}), 200
