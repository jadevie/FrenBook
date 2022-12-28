from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Comment
from app.forms import CommentForm
from .session import validation_errors_to_error_messages

bp = Blueprint("comments", __name__, url_prefix="/comments")

@bp.route('/<int:comment_id>')
@login_required
def get_comment_by_id(comment_id):
    comment = Comment.query.get(comment_id)
    return {'comment': comment.to_dict()}

@bp.route('/<int:comment_id>', methods =['PUT'])
@login_required
def update_comment(comment_id):
    if not current_user.is_authenticated:
        return {"errors": { "message": "You have to log in to update your comment"}}

    comment = Comment.query.get(comment_id)
    if not comment:
        return {"message": "Comment couldn't be found"}

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if current_user.id == comment.user_id:
        if (form.validate_on_submit()):
            comment.body = form.data['body']
            db.session.commit()
            return comment.to_dict(), 201
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    return {
        'errors': {
            'user': "MYou're not authorized to edit this comment"
        }
    }, 400

@bp.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    if not current_user.is_authenticated:
        return {"errors": { "message": "You have to log in to update your comment"}}

    comment = Comment.query.get(comment_id)
    if not comment:
        return {'message': "Comment couldn't be found"}, 404

    if comment.user_id != current_user.id:
        error = {
            'message': 'You are not authorized to delete this comment'
        }
        return error, 403

    db.session.delete(comment)
    db.session.commit()
    return {
            "message": "Successfully deleted",
            "statusCode": 200
        }
