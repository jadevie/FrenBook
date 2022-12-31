from .db import db
from flask_login import UserMixin
from sqlalchemy.sql import func
from sqlalchemy.types import Integer, DateTime, TEXT
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.orm import relationship

likes = Table(
    'likes',
    db.Model.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('post_id', Integer, ForeignKey('posts.id'), primary_key=True),
)

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
    comments = relationship('Comment',cascade ='all, delete-orphan', back_populates='post')
    post_likes = relationship(
        "User",
        secondary=likes,
        back_populates='user_likes',
        cascade="all, delete"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'body': self.body,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user' : self.user.to_dict_no_posts(),
            'images': [image.to_dict() for image in self.images],
            'comments': [comment.to_dict() for comment in self.comments],
            'likes': len(self.post_likes)
        }
