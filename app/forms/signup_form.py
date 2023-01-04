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

def long_first_name(form, field):
    if (len(form.data['first_name']) > 25 ):
        raise ValidationError("First name can't be longer than 25 characters")

def long_last_name(form,field):
    if (len(form.data['last_name']) > 25):
        raise ValidationError("Last name can't be longer than 25 characters")

def long_username(form,field):
    if (len(form.data['username']) > 15):
        raise ValidationError("Username can't be longer than 15 characters")

def long_email(form,field):
    if (len(form.data['email']) > 100):
        raise ValidationError("Username can't be longer than 100 characters")

def long_password(form,field):
    if (len(form.data['password']) > 8):
        raise ValidationError("Password can't be longer than 8 characters")


class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[long_first_name])
    last_name = StringField('last_name', validators=[long_last_name])
    username = StringField('username', validators=[DataRequired(), username_exists, long_username])
    email = EmailField('email', validators=[DataRequired(), user_exists, Email(), long_email])
    password = PasswordField('password', validators=[DataRequired(), long_password])
    birthday = DateField('birthday')
    gender = StringField('gender')
    # profile_picture_url = URLField('profile picture', validators=[URL()])
