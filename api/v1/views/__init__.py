from flask import Blueprint


app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from api.v1.views.index import *
from api.v1.views.recruiter import *
from api.v1.views.job_seeker import *
from api.v1.views.certification import *
from api.v1.views.education import *
from api.v1.views.experience import *
from api.v1.views.portfolio import *
from api.v1.views.review import *
from api.v1.views.view import *
from api.v1.views.user_auth import *
from api.v1.views.all_models import *
from api.v1.views.recruiter_review import *
