from flask import Blueprint
from . import users, session, post, comment

bp = Blueprint("api", __name__, url_prefix="/api")

bp.register_blueprint(users.bp)
bp.register_blueprint(session.bp)
bp.register_blueprint(post.bp)
bp.register_blueprint(comment.bp)
