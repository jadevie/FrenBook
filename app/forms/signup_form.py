from flask_wtf import FlaskForm
from wtforms.fields import StringField, DateField, PasswordField
from wtforms.fields.html5 import EmailField, URLField
from wtforms.validators import DataRequired, ValidationError, Email, URL
from app.models import User

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField('first_name')
    last_name = StringField('last_name')
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = EmailField('email', validators=[DataRequired(), user_exists, Email()])
    password = PasswordField('password', validators=[DataRequired()])
    birthday = DateField('birthday')
    gender = StringField('gender')
    # profile_picture_url = URLField('profile picture', validators=[URL()])
