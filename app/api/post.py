from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Post, PostImage, Comment, Like
from app.forms import PostForm, PostImageForm, CommentForm
from .session import validation_errors_to_error_messages

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
        error = {"message": "Post couldn't be found" }
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
        return {"message": "Post couldn't be found"}

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

@bp.route('/<int:post_id>/images/<int:image_id>', methods=['DELETE'])
@login_required
def del_image(post_id, image_id):
    if not current_user.is_authenticated:
        return {"errors": { "message": "You have to own this post to delete image"}}

    post = Post.query.get(post_id)
    if not post:
        return {"message": "Post couldn't be found"}

    if post.user_id != current_user.id:
        error = {
            'message': 'You are not authorized to delete this photo'
        }
        return error, 403

    image = PostImage.query.get(image_id)
    if not image:
        return {"message": "Image couldn't be found"}

    db.session.delete(image)
    db.session.commit()
    return {
            "message": "Successfully deleted",
            "statusCode": 200
        }


@bp.route('/<int:post_id>/comments', methods =['POST'])
@login_required
def post_comment(post_id):
    if not current_user.is_authenticated:
        return {"errors": { "message": "You have to leave a comment to this post"}}

    post = Post.query.get(post_id)
    if not post:
        return {'message': 'Post not found'}, 400

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if (form.validate_on_submit()):
        comment = Comment(
        user_id = current_user.id,
        post_id = post.id,
        body = form.data['body']
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@bp.route('/<int:post_id>/likes', methods =['POST'])
@login_required
def add_like(post_id):
    post = Post.query.get(post_id)
    like = Like.query.filter_by(user_id = current_user.id, post_id = post_id).first()
    if not post:
        return {"message": "Post couldn't be found"}

    if not like :
        newLike = Like(
            user_id = current_user.id,
            post_id = post_id
            )
        db.session.add(newLike)
        db.session.commit()
        return  jsonify(newLike.to_dict())
    return {"message" : "You already liked this post"}

@bp.route('/<int:post_id>/likes/delete', methods =['DELETE'])
@login_required
def delete_like(post_id):
    post = Post.query.get(post_id)
    like = Like.query.filter_by(user_id = current_user.id, post_id=post_id).first()

    if not post:
        return {"message": "Post couldn't be found"}

    if like :
        db.session.delete(like)
        db.session.commit()
        return {"message": "Like removed"}

    return {"message": "You have to like it first before removing your like"}
