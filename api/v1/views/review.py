from api.v1.views import app_views
from flask import jsonify, request
from models import storage
from models.job_seeker import JobSeeker
from models.review import Review


@app_views.route('/job_seeker/review', methods=['GET', 'POST', 'DELETE'], strict_slashes=False)
def job_seeker_review():
    """This method returns all the reviews"""
    args = request.args
    if 'job_seeker_id' in args:
        job_seeker = storage.get(JobSeeker, args['job_seeker_id'])
        if job_seeker is None:
            return jsonify({'error': 'JobSeeker not found'}), 404

        if request.method == 'GET':
            return jsonify([
                review.to_dict() for review in job_seeker.reviews
            ])

        if request.method == 'DELETE':
            for review in job_seeker.reviews:
                storage.delete(review)
            storage.save()
            return jsonify({}), 200

        if request.method == 'POST':
            must_attr = ['rating', 'description']
            for attr in must_attr:
                if attr not in request.get_json():
                    return jsonify({'error': 'Missing attribute: ' + attr}), 400
            request.get_json()['job_seeker_id'] = job_seeker.id
            review = Review(**request.get_json())
            review.save()
            return jsonify(review.to_dict()), 201
    else:
        return jsonify({'error': 'Missing job_seeker_id'}), 400


@app_views.route('/review', methods=['GET', 'PUT', 'DELETE'], strict_slashes=False)
def reviews():
    """This method returns all the reviews"""
    args = request.args
    if 'review_id' not in args:
        return jsonify({'error': 'Missing review_id'}), 400
    review = storage.get(Review, args['review_id'])
    if review is None:
        return jsonify({'error': 'Review not found'}), 404

    if request.method == 'GET':
        return jsonify(review.to_dict())

    if request.method == 'DELETE':
        storage.delete(review)
        storage.save()
        return jsonify({}), 200

    if request.method == 'PUT':
        must_not_attr = ['id', 'created_at', 'updated_at']
        for key, value in request.get_json().items():
            if key not in must_not_attr:
                setattr(review, key, value)
        review.save()
        return jsonify(review.to_dict()), 200