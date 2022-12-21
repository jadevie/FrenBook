from .db import db
from flask_login import UserMixin
from sqlalchemy.types import Integer, TEXT, DateTime
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.sql import func

class PostImage(db.Model, UserMixin):
    __tablename__ = 'postImages'

    id = Column(Integer, primary_key=True)
    post_id = Column(Integer, ForeignKey('posts.id'), ondelete='CASCADE')
    image_url = Column(TEXT, nullable=True)
    created_at = Column(DateTime(timezone=True),
                        server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True),
                        server_default=func.now(), onupdate=func.now(),
                        nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'comment_id': self.comment_id
        }
