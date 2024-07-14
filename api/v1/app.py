from flask import Flask, jsonify, make_response, Blueprint, request, abort, Response
from models import storage
from api.v1.views import app_views
from os import getenv
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from models.job_seeker import JobSeeker
from models.recruiter import Recruiter
from api.v1.auth.session_auth import SessionDBAuth


auth = SessionDBAuth()
app = Flask(__name__)
login_manager = LoginManager()
login_manager.init_app(app)
app.register_blueprint(app_views)
# CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}})
CORS(app, supports_credentials=True)


app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql+psycopg2://iamready_dev:iamready_dev_pwd@localhost:5432/iamready_dev'
app.config["SECRET_KEY"] = "i_am_ready_secret_key"


@app.before_request
def before_request():
    print("request: ", request)
    print("headers: ", request.headers)
    print("cookies: ", request.cookies)
    # Add your custom logic here
    print("Before request")
    # You can also check the current user and perform any necessary actions
    if current_user.is_authenticated:
        print(f"Authenticated user: {current_user.id}")
    else:
        print("Unauthenticated user")


# load the user
@login_manager.user_loader
def load_user(user_id):
    print(user_id)
    user_type = user_id.split('_')[0]
    
    if user_type == 'jobseeker':
        user = storage.get(JobSeeker, user_id)
        print("user: ", user)
    elif user_type == 'recruiter':
        user = storage.get(Recruiter, user_id)
    else:
        return None

    if user:
        return user
    else:
        return None


# add swagger documentation of the API
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