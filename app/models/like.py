from .db import db
from flask_login import UserMixin
from sqlalchemy.types import Integer
from sqlalchemy.schema import Column, ForeignKey

class Like(db.Model, UserMixin):
    __tablename__ = 'likes'

    id = Column(Integer, primary_key=True)
    post_id=Column(Integer, ForeignKey('posts.id', ondelete='CASCADE'), nullable=False)
    user_id=Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    comment_id=Column(Integer, ForeignKey('comments.id', ondelete='CASCADE'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'comment_id': self.comment_id
        }
