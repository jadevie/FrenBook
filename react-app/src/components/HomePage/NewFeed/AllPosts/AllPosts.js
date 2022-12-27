// import styles from './AllPosts.module.css';
import React from 'react';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm/CommentForm';
import { Ellipsis } from './Ellipsis/Ellipsis';


const AllPosts = ({ user }) => {
    const posts = useSelector(state => state.posts);
    const postArray = Object.values(posts)
        .sort((a, b) => a.id < b.id ? 1 : -1);

    return (
        <div>{postArray.map((post, i) =>
            <div key={i}>
                <div>{post.user.username}</div>
                <div>{user.id === post.user_id ? <Ellipsis post={post} /> : null}</div>
                <div>
                    <img src={`${post.user.profile_picture_url}`} alt='profile' />
                </div>
                <div>{post.created_at}</div>
                <div>{post.body}</div>
                <div>
                    {post.images.length ? post.images.map((image, i) => <img key={i} id='postImage' alt='postImage' src={image.image_url} />) : null}
                </div>
                <div>
                    {post.comments.length ? post.comments.map((comment, i) => <div key={i}>{comment.body}</div>) : null}
                </div>
                <div>
                    <CommentForm post={post} />
                </div>
            </div>)}
        </div>
    );
};

export default AllPosts;
