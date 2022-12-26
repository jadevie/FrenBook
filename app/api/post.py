from flask import Blueprint, request
from flask_login import login_required, current_user, login_user, logout_user
from app.models import db, Post, PostImage
from app.forms import PostForm, PostImageForm
from .users import validation_errors_to_error_messages

bp = Blueprint("posts", __name__, url_prefix="/posts")

@bp.route("")
@login_required
def get_posts():
    '''
    Get all posts from the most recent post
    '''
    posts = Post.query.order_by(Post.created_at.desc()).all()
    return {'posts': [post.to_dict() for post in posts]}

@bp.route('/current')
@login_required
def get_posts_current_user():
    '''
    Get all posts of current user
    '''
    if current_user.is_authenticated:
        user_posts = current_user.posts
        return {'posts': [post.to_dict() for post in user_posts]}

@bp.route('/<int:post_id>')
@login_required
def get_post_by_id(post_id):
    post = Post.query.get(post_id)
    return {'post': post.to_dict()}

@bp.route('/new', methods=['POST'])
@login_required
def create_post():
    '''
    Create a post
    '''
    if not current_user.is_authenticated:
        return {
            "errors": { "message": "You have to log in to create post"}
            }
    form = PostForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if (form.validate_on_submit()):
        post = Post (
            user_id = current_user.id,
            body = form.data['body']
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict(), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@bp.route('/<int:post_id>', methods=['PUT'])
@login_required
def update_post(post_id):
    '''
    Update a post
    '''
    if not current_user.is_authenticated:
        return {"errors": { "message": "You have to log in to update post"}}

    post = Post.query.get(post_id)
    if not post:
        return {'message': 'Post not found'}

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if current_user.id == post.user_id:
        if (form.validate_on_submit()):
            post.body = form.data['body']
            db.session.commit()
            return post.to_dict(), 201
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    return {
        'errors': {
            'user': "Must own the post to update it"
        }
    }, 400


@bp.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    '''
    Delete a post
    '''
    post = Post.query.get(post_id)
    if not post:
        error = {
            "message": "Post not found"
        }
        return error, 404

    if post.user_id != current_user.id:
        error = {
            'message': 'You are not authorized to delete this post'
        }
        return error, 403

    if post.user_id == current_user.id:
        db.session.delete(post)
        db.session.commit()
        return {
            "message": "Successfully deleted",
            "statusCode": 200
        }

@bp.route('/<int:post_id>/images/new', methods=['POST'])
@login_required
def add_image(post_id):
    post = Post.query.get(post_id)
    if not post:
        return {'message': 'Post not found'}

    form = PostImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if post.user_id == current_user.id:
        if (form.validate_on_submit()):
            post_image = PostImage (
                post_id = post.id,
                image_url = form.data['image_url']
            )
            db.session.add(post_image)
            db.session.commit()
            return post_image.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
