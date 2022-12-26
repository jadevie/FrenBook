from .db import db
from flask_login import UserMixin
from sqlalchemy.sql import func
from sqlalchemy.types import Integer, DateTime, TEXT
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
class Post(db.Model, UserMixin):
    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True)
    user_id=Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    body=Column(TEXT, nullable=False)
    created_at = Column(DateTime(timezone=True),
                        server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True),
                        server_default=func.now(), onupdate=func.now(),
                        nullable=False)

    user = relationship("User", foreign_keys=[user_id], back_populates="posts")
    images = relationship('PostImage',cascade="all, delete-orphan", back_populates='post')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'body': self.body,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user' : self.user.to_dict_no_posts(),
            'images': [image.to_dict() for image in self.images]
        }
