// import styles from './AllPosts.module.css';
import React from 'react';
import { useSelector } from 'react-redux';
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
                <div>{post.images.length ? post.images.map(image => <img id='postImage' alt='postImage' src={image.image_url} />) : null} </div>
            </div>)}
        </div>
    );
};

export default AllPosts;
