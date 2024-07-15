from api.v1.views import app_views
from flask import jsonify, request, abort
from models import storage
from models.job_seeker import JobSeeker
from models.payment import Payment



@app_views.route('/job_seeker/payment', methods=['POST'], strict_slashes=False)
def create_payment():
    """This method creates a payment"""
    job_seeker = request.current_user
    must_attr = ['amount', 'paid']
    for attr in must_attr:
        if attr not in request.get_json():
            return jsonify({'error': 'Missing attribute: ' + attr}), 400
    request.get_json()['job_seeker_id'] = job_seeker.id
    payment = Payment(**request.get_json())
    payment.save()
    return jsonify(payment.to_dict()), 201


@app_views.route('/job_seeker/payment', methods=['GET'], strict_slashes=False)
def get_payments():
    """This method returns all the payments"""
    job_seeker = request.current_user
    payment = job_seeker.payment

    if payment:
        return jsonify([
            [payment.to_dict()]
        ])
    return jsonify([])


@app_views.route('/job_seeker/payment', methods=['PUT'], strict_slashes=False)
def update_payment():
    """This method updates an payment"""
    args = request.args
    if 'payment_id' not in args:
        return jsonify({'error': 'Missing payment_id'}), 400
    payment = storage.get(Payment, args['payment_id'])
    if payment is None:
        abort(404)

    must_not_attr = ['id', 'created_at', 'updated_at']
    for key, value in request.get_json().items():
        if key not in must_not_attr:
            setattr(payment, key, value)
    payment.save()
    return jsonify(payment.to_dict()), 200


@app_views.route('/job_seeker/payment', methods=['DELETE'], strict_slashes=False)
def delete_payment():
    """This method deletes a payment"""
    job_seeker = request.current_user

    args = request.args
    if 'payment_id' not in args:
        return jsonify({'error': 'Missing payment_id'}), 400
    payment = storage.get(Payment, args['payment_id'])
    if payment is None:
        abort(404)
    storage.delete(payment)
    storage.save()
    return jsonify({}), 200
