from api.v1.views import app_views
from flask import jsonify, request, make_response, abort
from models import storage
from models.recruiter import Recruiter


@app_views.route('/register/recruiter', methods=['POST'], strict_slashes=False)
def register_recruiter():
    """This method registers a recruiter"""
    must_attr = ['companyName', 'email', 'country', 'companyDesc', 'password', 'city']
    for attr in must_attr:
        if attr not in request.get_json():
            return jsonify({"error": "Missing attribute: " + attr}), 400

    if request.get_json().get("user_type") not in ["r"]:
        return jsonify({"error": "user_type must either be r"}), 400

    user = storage.find_user_by(Recruiter, email=request.get_json().get('email'))
    if user:
        return jsonify({"error": "Email already exists"}), 400
    from api.v1.app import auth
    recruiter = auth.register_user(Recruiter, **request.get_json())
    return jsonify(recruiter.to_dict()), 201


@app_views.route('/recruiter', methods=['PUT', 'OPTIONS'], strict_slashes=False)
def update_recruiter():
    """This method updates a recruiter"""
    recruiter_id = request.current_user.id
    recruiter = storage.get(Recruiter, recruiter_id)
    if recruiter is None:
        abort(404)

    must_not_attr = ['id', 'created_at', 'updated_at']
    for key, value in request.get_json().items():
        if key not in must_not_attr:
            setattr(recruiter, key, value)
    recruiter.save()
    return jsonify(recruiter.to_dict()), 200


@app_views.route('/recruiter', methods=['GET', 'OPTIONS'], strict_slashes=False)
def get_recruiter():
    """This method gets a recruiter"""
    recruiter = request.current_user
    if recruiter is None:
        abort(401)
    return jsonify(recruiter.to_dict())


@app_views.route('/recruiter', methods=['DELETE', 'OPTIONS'], strict_slashes=False)
def delete_recruiter():
    """This method deletes a recruiter"""
    recruiter_id = request.current_user.id
    recruiter = storage.get(Recruiter, recruiter_id)
    storage.delete(recruiter)
    storage.save()
    response = jsonify({})
    response.delete_cookie('session_id')
    response.delete_cookie('user_type')
    return response, 200