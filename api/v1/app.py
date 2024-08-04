from flask import Flask, jsonify, make_response, Blueprint, request, abort, Response
from models import storage
from api.v1.views import app_views
from os import getenv
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint

# import the authentication class
from api.v1.auth.session_auth import SessionDBAuth


# Initialize the app and set up the cross origin resources.
app = Flask(__name__)
app.register_blueprint(app_views)
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}})
app.config["SESSION_COOKIE_SAMESITE"] = "None"


# set up swagger API documentation
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
SWAGGER_URL = "/swagger"
API_URL = "/static/swagger.json"

swagger_ui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': 'Access API'
    }
)

app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)

# Instantiate the authentication class
auth = SessionDBAuth()


# Define things to be executed before any request like checking the route that needs to be authenticated.
@app.before_request
def before_request():
    """Method that runs before each request to
        handle authentication.
    """
    if request.method.lower() == 'options':
        return Response()
    # Check if the request path requires authentication
    if auth.require_auth(
        request.path,
        [
            '/api/v1/status/', '/api/v1/stats/',
            '/api/v1/login/', '/api/v1/register/job_seeker',
            '/api/v1/reset_password/', '/api/v1/register/recruiter',
            '/swagger/*', '/static/*', '/api/v1/reviews'
        ]
    ):
        if (
            not auth.session_cookie(request)
        ):
            abort(401)  # Unauthorized
        if not auth.current_user(request):
            abort(403)  # Forbidden
    request.current_user = auth.current_user(request)


@app.errorhandler(404)
def not_found(error):
    """This method handles 404 errors"""
    return make_response(jsonify({"error": "Not found"}), 404)


@app.teardown_appcontext
def close(error):
    """This method closes the current session"""
    storage.close()


@app.errorhandler(401)
def not_authorized(error) -> str:
    """ Not authorized handler
    """
    return jsonify({"error": "Unauthorized"}), 401


@app.errorhandler(403)
def forbidden(error) -> str:
    """ Forbidden handler
    """
    return jsonify({"error": "Forbidden"}), 403


@app.errorhandler(404)
def not_found(error) -> str:
    """ Not found handler
    """
    return jsonify({"error": "Not found"}), 404


if __name__ == "__main__":
    HOST = getenv("I_AM_READY_HOST", "0.0.0.0")
    PORT = getenv("I_AM_READY_PORT", "5000")
    app.run(host=HOST, port=PORT, threaded=True)