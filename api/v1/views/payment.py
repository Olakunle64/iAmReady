from api.v1.views import app_views
from flask import jsonify, request
from models import storage
from models.job_seeker import JobSeeker
from models.payment import Payment


@app_views.route('/job_seeker/payment', methods=['GET', 'POST', 'DELETE'], strict_slashes=False)
def job_seeker_payment():
    """This method returns all the payments"""
    args = request.args
    if 'job_seeker_id' in args:
        job_seeker = storage.get(JobSeeker, args['job_seeker_id'])
        if job_seeker is None:
            return jsonify({'error': 'JobSeeker not found'}), 404

        if request.method == 'GET':
            return jsonify([
                payment.to_dict() for payment in job_seeker.payments
            ])

        if request.method == 'DELETE':
            for payment in job_seeker.payments:
                storage.delete(payment)
            storage.save()
            return jsonify({}), 200

        if request.method == 'POST':
            must_attr = ['amount', 'paid']
            for attr in must_attr:
                if attr not in request.get_json():
                    return jsonify({'error': 'Missing attribute: ' + attr}), 400
            request.get_json()['job_seeker_id'] = job_seeker.id
            payment = Payment(**request.get_json())
            payment.save()
            return jsonify(payment.to_dict()), 201
    else:
        return jsonify({'error': 'Missing job_seeker_id'}), 400


@app_views.route('/payment', methods=['GET', 'PUT', 'DELETE'], strict_slashes=False)
def payments():
    """This method returns all the payments"""
    args = request.args
    if 'payment_id' not in args:
        return jsonify({'error': 'Missing payment_id'}), 400
    payment = storage.get(Payment, args['payment_id'])
    if payment is None:
        return jsonify({'error': 'Payment not found'}), 404

    if request.method == 'GET':
        return jsonify(payment.to_dict())

    if request.method == 'DELETE':
        storage.delete(payment)
        storage.save()
        return jsonify({}), 200

    if request.method == 'PUT':
        must_not_attr = ['id', 'created_at', 'updated_at']
        for key, value in request.get_json().items():
            if key not in must_not_attr:
                setattr(payment, key, value)
        payment.save()
        return jsonify(payment.to_dict()), 200