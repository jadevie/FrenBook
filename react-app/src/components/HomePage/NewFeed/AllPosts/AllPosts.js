import styles from './AllPosts.module.css';
import React from 'react';
import { useSelector } from 'react-redux';


const AllPosts = ({ user }) => {
    const posts = useSelector(state => state.posts.allPosts);
    const postArray = Object.values(posts)
        .sort((a, b) => a.id < b.id ? 1 : -1);

    return (
        <div>{postArray.map(post =>
            <div>
                <div>{post.user.username}</div>
                <div>
                    <img src={`${post.user.profile_picture_url}`} alt='profile' />
                </div>
                <div>{post.created_at}</div>
                <div>{post.body}</div>
            </div>)}
        </div>
    );
};

export default AllPosts;