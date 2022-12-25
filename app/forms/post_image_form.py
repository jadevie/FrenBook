from flask_wtf import FlaskForm
from wtforms.fields import StringField
from wtforms.validators import DataRequired

class PostImageForm(FlaskForm):
    image_url = StringField()
