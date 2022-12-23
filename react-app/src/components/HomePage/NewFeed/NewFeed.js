import styles from './NewFeed.module.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../../store/posts';


const NewFeed = () => {
    const posts = useSelector(state => state.posts);
    const postArray = Object.values(posts)
        .sort((a, b) => a.id < b.id ? 1 : -1);

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getPosts());
    }, []);

    const handleOnclick = e => {
        e.preventDefault();

    };

    return (
        <div className={styles.NewFeed}>
            <div className={styles.lineWrapper}>
                <div className={styles.createPostWrapper}>
                    <div className={styles.img}> <img src={`${user.profile_picture_url}`} alt='profile' /></div>
                    <button onClick={handleOnclick} className={styles.question}>What's on your mind, {user.first_name}?</button>
                </div>
                <div className={styles.line}></div>
            </div>

            <div>{postArray.map(post =>
                <div>
                    <div>{post.user.username}</div>
                    <div>
                        <img src={`${post.user.profile_picture_url}`} alt='profile' />
                    </div>
                    <div>{post.created_at}</div>
                    <div>{post.body}</div>
                </div>)}</div>

        </div>
    );
};

export default NewFeed;
