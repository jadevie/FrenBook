from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user, login_user, logout_user
from app.forms import SignUpForm
from app.models import db, User

bp = Blueprint("users", __name__, url_prefix="/users")

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

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

@bp.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            birthday=form.data['birthday'],
            gender=form.data['gender'],
            # profile_picture_url=form.data['profile_picture_url']
            )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
