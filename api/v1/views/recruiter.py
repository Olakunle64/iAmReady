from api.v1.views import app_views
from flask import jsonify, request
from models import storage
from models.recruiter import Recruiter



@app_views.route('/recruiter', methods=['GET', 'POST', 'DELETE'], strict_slashes=False)
def recruiters():
    """This method returns all the recruiters"""
    recruiter_id = request.args.get('recruiter_id')
    if not recruiter_id:
        if request.method == 'POST':
            must_attr = ['companyName', 'email', 'country', 'companyDesc', 'password', 'city']
            for attr in must_attr:
                if attr not in request.get_json():
                    return jsonify({"error": "Missing attribute: " + attr}), 400
            if storage.check_attr_val(Recruiter, 'email', request.get_json().get('email')):
                return jsonify({"error": "Email already exists"}), 400
            recruiter = Recruiter(**request.get_json())
            recruiter.save()
            return jsonify(recruiter.to_dict()), 201

        if request.method == 'GET':
            recruiters = storage.all(Recruiter)
            return jsonify([recruiter.to_dict() for recruiter in recruiters.values()])

    recruiter = storage.get(Recruiter, recruiter_id)
    if recruiter is None:
        return jsonify({"error": "Not found"}), 404

    if request.method == 'GET':
        return jsonify(recruiter.to_dict())

    if request.method == 'DELETE':
        storage.delete(recruiter)
        storage.save()
        return jsonify({}), 200

    if request.method == 'PUT':
        must_not_attr = ['id', 'created_at', 'updated_at']
        for key, value in request.get_json().items():
            if key not in must_not_attr:
                setattr(recruiter, key, value)
        recruiter.save()
        return jsonify(recruiter.to_dict()), 200
