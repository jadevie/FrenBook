from flask_wtf import FlaskForm
from wtforms.fields import StringField
from wtforms.validators import DataRequired, ValidationError


class PostForm(FlaskForm):
    body = StringField('body')
