"""This module has the login and logout routes"""
from api.v1.views import app_views
from flask import jsonify, request, make_response, abort
from models import storage
from models.job_seeker import JobSeeker
from models.recruiter import Recruiter
from flask_cors import cross_origin
from flask_login import login_user, logout_user, current_user


@app_views.route('/login', methods=['POST'], strict_slashes=False)
def login():
    """This method logs in a user"""
    from api.v1.app import auth
    user_details = request.get_json()
    if not user_details or 'email' not in user_details or 'password' not in user_details:
        return jsonify({"error": "Missing attribute: email or password"}), 400
    
    user_type = user_details.get("user_type")

    if user_type == "j":
        userExist = auth.valid_login(JobSeeker, user_details.get('email'), user_details.get('password'))
        if not userExist:
            return jsonify({"error": "email or password incorrect"}), 401
        user = storage.find_user_by(JobSeeker, email=user_details.get('email'))
    elif user_type == "r":
        userExist = auth.valid_login(Recruiter, user_details.get('email'), user_details.get('password'))
        if not userExist:
            return jsonify({"error": "email or password incorrect"}), 401
        user = storage.find_user_by(Recruiter, email=user_details.get('email'))
    else:
        return jsonify({"error": "Invalid user type"}), 400
    
    login_user(user)
    response = make_response(jsonify(user.to_dict()))
    print("response", response.headers)
    print("Cookies in the response:", response.headers.get('Set-Cookie'))
    return response
    # session_id = auth.create_session(user_type, user.id)
    # if not session_id:
    #     abort(401)
    
    # # add the session_id to cookie
    # # response = make_response(jsonify({"message": "Logged in"}))
    # response = make_response(jsonify(user.to_dict()))
    # response.set_cookie('session_id', session_id)
    # response.set_cookie('user_type', user_type)
    # return response

@app_views.route('/logout', methods=['POST', 'OPTIONS'], strict_slashes=False)
# @cross_origin(supports_credentials=True)
def logout():
    from api.v1.app import auth
    """This method logs out a user"""
    logout_user()
    return jsonify({"message": "Logged out"})


@app_views.route('/reset_password', methods=['POST'], strict_slashes=False)
def get_reset_password_token():
    """This method provides a password reset token for a user"""
    from api.v1.app import auth
    user_details = request.get_json()
    if 'email' not in user_details:
        return jsonify({"error": "Missing attribute: email"}), 400
    
    email = user_details.get("email")
    user_type = user_details.get("user_type")
    
    if user_type == "j":
        cls = JobSeeker
    elif user_type == "r":
        cls = Recruiter
    else:
        return jsonify({"error": "Invalid user type"}), 400

    token = auth.get_reset_password_token(cls, email)
    if not token:
        abort(404)
    return jsonify({"email": email, "reset_token": token}), 200


@app_views.route("/reset_password", methods=["PUT"], strict_slashes=False)
def update_password():
    """This method updates a user's password using a reset token"""
    from api.v1.app import auth
    user_details = request.get_json()
    if 'email' not in user_details or 'reset_token' not in user_details or 'new_password' not in user_details:
        return jsonify({"error": "Missing attribute: email, reset_token, or new_password"}), 400
    
    email = user_details.get("email")
    reset_token = user_details.get("reset_token")
    new_password = user_details.get("new_password")
    user_type = user_details.get("user_type")
    
    if user_type == "j":
        cls = JobSeeker
    elif user_type == "r":
        cls = Recruiter
    else:
        return jsonify({"error": "Invalid user type"}), 400

    try:
        auth.update_password(cls, reset_token, new_password)
        return jsonify({"email": email, "message": "Password updated"}), 200
    except ValueError:
        return jsonify({"error": "Invalid reset token"}), 404