from flask_wtf import FlaskForm
from wtforms.fields import StringField
from wtforms.validators import DataRequired,ValidationError


def long_comment(form, field):
    body = form.data['body']
    if len(body) > 8000:
        raise ValidationError("Comment can't be longer than 8,000 characters.Try shorten your comment")

class CommentForm(FlaskForm):
    body = StringField('body',validators=[DataRequired(), long_comment])
