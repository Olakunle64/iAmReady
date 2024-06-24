from api.v1.views import app_views
from flask import jsonify, request
from models import storage
from models.job_seeker import JobSeeker
from models.portfolio import Portfolio


@app_views.route('/job_seeker/portfolio', methods=['GET', 'POST', 'DELETE'], strict_slashes=False)
def job_seeker_portfolio():
    """This method returns all the portfolios"""
    args = request.args
    if 'job_seeker_id' in args:
        job_seeker = storage.get(JobSeeker, args['job_seeker_id'])
        if job_seeker is None:
            return jsonify({'error': 'JobSeeker not found'}), 404

        if request.method == 'GET':
            return jsonify([
                portfolio.to_dict() for portfolio in job_seeker.portfolios
            ])

        if request.method == 'DELETE':
            for portfolio in job_seeker.portfolios:
                storage.delete(portfolio)
            storage.save()
            return jsonify({}), 200

        if request.method == 'POST':
            must_attr = ['title', 'description']
            for attr in must_attr:
                if attr not in request.get_json():
                    return jsonify({'error': 'Missing attribute: ' + attr}), 400
            request.get_json()['job_seeker_id'] = job_seeker.id
            portfolio = Portfolio(**request.get_json())
            portfolio.save()
            return jsonify(portfolio.to_dict()), 201
    else:
        return jsonify({'error': 'Missing job_seeker_id'}), 400


@app_views.route('/portfolio', methods=['GET', 'PUT', 'DELETE'], strict_slashes=False)
def portfolios():
    """This method returns all the portfolios"""
    args = request.args
    if 'portfolio_id' not in args:
        return jsonify({'error': 'Missing portfolio_id'}), 400
    portfolio = storage.get(Portfolio, args['portfolio_id'])
    if portfolio is None:
        return jsonify({'error': 'Portfolio not found'}), 404

    if request.method == 'GET':
        return jsonify(portfolio.to_dict())

    if request.method == 'DELETE':
        storage.delete(portfolio)
        storage.save()
        return jsonify({}), 200

    if request.method == 'PUT':
        must_not_attr = ['id', 'created_at', 'updated_at']
        for key, value in request.get_json().items():
            if key not in must_not_attr:
                setattr(portfolio, key, value)
        portfolio.save()
        return jsonify(portfolio.to_dict()), 200