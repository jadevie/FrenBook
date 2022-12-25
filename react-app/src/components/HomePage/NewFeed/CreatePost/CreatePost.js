import styles from './CreatePost.module.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setCreatePostModal } from '../../../../store/ui';

const CreatePost = ({ user }) => {
    const dispatch = useDispatch();

    const handleOnclick = async e => {
        e.preventDefault();
        await dispatch(setCreatePostModal(true));
    };

    return (
        <div className={styles.lineWrapper}>
            <div className={styles.createPostWrapper}>
                <div className={styles.img}> <img src={`${user.profile_picture_url}`} alt='profile' /></div>
                <button onClick={handleOnclick} className={styles.question}>What's on your mind, {user.first_name}?</button>
            </div>
            <div className={styles.line}></div>
        </div>
    );
};

export default CreatePost;
