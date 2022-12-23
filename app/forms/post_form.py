from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
    body = TextAreaField('body', validators=[DataRequired()])
