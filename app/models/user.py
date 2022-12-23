from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func
from sqlalchemy.types import Integer, DateTime, VARCHAR, TEXT
from sqlalchemy.schema import Column
from sqlalchemy.orm import relationship


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    first_name= Column(VARCHAR(25), nullable=False)
    last_name= Column(VARCHAR(25), nullable=False)
    username = Column(VARCHAR(40), nullable=False, unique=True)
    email = Column(VARCHAR(100), nullable=False, unique=True)
    hashed_password = Column(TEXT, nullable=False)
    birthday=Column(DateTime, nullable=False)
    gender=Column(TEXT, nullable=False)
    profile_picture_url=Column(TEXT, nullable=True)
    created_at = Column(DateTime(timezone=True),
                        server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True),
                        server_default=func.now(), onupdate=func.now(),
                        nullable=False)

    posts = relationship(
        "Post", back_populates="user", cascade="all, delete-orphan")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'birthday': self.birthday,
            'gender': self.gender,
            'profile_picture_url': self.profile_picture_url,
            'posts' : [post.to_dict() for post in self.posts]
        }
