import styles from './NewFeed.module.css';
import React from 'react';
import { useSelector } from 'react-redux';
import CreatePost from './CreatePost/CreatePost';
import AllPosts from './AllPosts/AllPosts';


const NewFeed = () => {
    const user = useSelector(state => state.session.user);

    return (
        <div className={styles.NewFeed}>
            <div><CreatePost user={user} /></div>
            <div><AllPosts user={user} /></div>
        </div>
    );
};

export default NewFeed;
