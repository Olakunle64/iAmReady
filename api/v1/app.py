from flask import Flask, jsonify, make_response, Blueprint
from models import storage
from api.v1.views import app_views
from os import getenv
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint


app = Flask(__name__)
app.register_blueprint(app_views)
CORS(app, resources={r"/api/*": {"origins": "*"}})


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


if __name__ == "__main__":
    HOST = getenv("I_AM_READY_HOST", "0.0.0.0")
    PORT = getenv("I_AM_READY_PORT", "5000")
    app.run(host=HOST, port=PORT, threaded=True, debug=True)