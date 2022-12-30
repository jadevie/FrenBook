from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import LoginForm, SignUpForm
from app.models import User, db

bp = Blueprint("session", __name__, url_prefix="/session")

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@bp.route("")
def restore():
    if current_user.is_authenticated:
        return current_user.to_dict()
    else:
        return {"message": "Not logged in"}, 400

@bp.route("/login", methods=["POST"])
def login():
    if current_user.is_authenticated:
        return {"message": "Already logged in"}, 400

    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.filter(User.email == form.email.data).first()
        if not user:
            return {"errors": {"Email":"Email is invalid"}}, 400
        if not user.check_password(form.password.data):
            return {"errors": {"password":"Password was incorrect"}}, 400
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@bp.route("/logout")
@login_required
def logout():
    logout_user()
    return {"message": "Logged out"}


@bp.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401


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
            profile_picture_url= 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
