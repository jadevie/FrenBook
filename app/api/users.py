from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user, login_user, logout_user
from app.forms import SignUpForm
from app.models import db, User

bp = Blueprint("users", __name__, url_prefix="/users")

@bp.route('/all')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@bp.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
