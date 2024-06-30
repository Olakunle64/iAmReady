from api.v1.views import app_views
from flask import jsonify, request, abort
from models import storage
from models.job_seeker import JobSeeker
from models.portfolio import Portfolio


@app_views.route('/job_seeker/portfolio', methods=['POST'], strict_slashes=False)
def create_portfolio():
    """This method creates a portfolio"""
    job_seeker = request.current_user
    must_attr = ['title', 'description']
    for attr in must_attr:
        if attr not in request.get_json():
            return jsonify({'error': 'Missing attribute: ' + attr}), 400
    request.get_json()['job_seeker_id'] = job_seeker.id
    portfolio = Portfolio(**request.get_json())
    portfolio.save()
    return jsonify(portfolio.to_dict()), 201


@app_views.route('/job_seeker/portfolio', methods=['GET'], strict_slashes=False)
def get_portfolios():
    """This method returns all the portfolios"""
    job_seeker = request.current_user

    return jsonify([
        portfolio.to_dict() for portfolio in job_seeker.portfolios
    ])


@app_views.route('/job_seeker/portfolio', methods=['PUT'], strict_slashes=False)
def update_portfolio():
    """This method updates an portfolio"""
    args = request.args
    if 'portfolio_id' not in args:
        return jsonify({'error': 'Missing portfolio_id'}), 400
    portfolio = storage.get(Portfolio, args['portfolio_id'])
    if portfolio is None:
        abort(404)

    must_not_attr = ['id', 'created_at', 'updated_at']
    for key, value in request.get_json().items():
        if key not in must_not_attr:
            setattr(portfolio, key, value)
    portfolio.save()
    return jsonify(portfolio.to_dict()), 200


@app_views.route('/job_seeker/portfolio', methods=['DELETE'], strict_slashes=False)
def delete_portfolio():
    """This method deletes a portfolio"""
    job_seeker = request.current_user

    args = request.args
    if 'portfolio_id' not in args:
        return jsonify({'error': 'Missing portfolio_id'}), 400
    portfolio = storage.get(Portfolio, args['portfolio_id'])
    if portfolio is None:
        abort(404)
    storage.delete(portfolio)
    storage.save()
    return jsonify({}), 200
