import styles from './NewFeed.module.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../../store/posts';
import CreatePost from './CreatePost/CreatePost';
import AllPosts from './AllPosts/AllPosts';


const NewFeed = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getPosts());
    }, []);

    return (
        <div className={styles.NewFeed}>
            <div><CreatePost user={user} /></div>
            <div><AllPosts user={user} /></div>
        </div>
    );
};

export default NewFeed;
