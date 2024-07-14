from api.v1.views import app_views
from flask import jsonify, request, abort
from models import storage
from models.recruiter import Recruiter
from models.recruiter_review import RecruiterReview
from flask_login import login_required, current_user



@app_views.route('/recruiter/review', methods=['POST'], strict_slashes=False)
@login_required
def create_review():
    """This method creates a review"""
    recruiter = current_user
    must_attr = ['rating', 'description']
    for attr in must_attr:
        if attr not in request.get_json():
            return jsonify({'error': 'Missing attribute: ' + attr}), 400
    request.get_json()['recruiter_id'] = recruiter.id
    review = RecruiterReview(**request.get_json())
    review.save()
    return jsonify(review.to_dict()), 201


@app_views.route('/recruiter/review', methods=['GET'], strict_slashes=False)
@login_required
def get_reviews():
    """This method returns all the reviews"""
    recruiter = current_user

    return jsonify([
        review.to_dict() for review in recruiter.reviews
    ])


@app_views.route('/recruiter/review', methods=['PUT'], strict_slashes=False)
@login_required
def update_review():
    """This method updates an review"""
    args = request.args
    if 'review_id' not in args:
        return jsonify({'error': 'Missing review_id'}), 400
    review = storage.get(RecruiterReview, args['review_id'])
    if review is None:
        abort(404)

    must_not_attr = ['id', 'created_at', 'updated_at']
    for key, value in request.get_json().items():
        if key not in must_not_attr:
            setattr(review, key, value)
    review.save()
    return jsonify(review.to_dict()), 200


@app_views.route('/recruiter/review', methods=['DELETE'], strict_slashes=False)
@login_required
def delete_review():
    """This method deletes a review"""
    args = request.args
    if 'review_id' not in args:
        return jsonify({'error': 'Missing review_id'}), 400
    review = storage.get(RecruiterReview, args['review_id'])
    if review is None:
        abort(404)
    storage.delete(review)
    storage.save()
    return jsonify({}), 200
