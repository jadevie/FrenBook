import styles from './DropDownPostManager.module.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setEditPostModal } from '../../../../../../store/ui';
import { deletePost } from '../../../../../../store/postDetails';
import { setPostDetails } from '../../../../../../store/postDetails';

const DropDownPostManager = ({ post }) => {
    const dispatch = useDispatch();

    const handleEditPost = async post => {
        await dispatch(setPostDetails(post.id));
        await dispatch(setEditPostModal(true));
    };

    const handleDeletePost = async e => {
        e.preventDefault();
        await dispatch(setPostDetails(post.id));
        await dispatch(deletePost(post.id));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <div className={styles.iconWrapper}>
                    <i className="fa-solid fa-pen"></i>
                </div>
                <div><button onClick={() => handleEditPost(post)}>Edit post</button></div>
            </div>
            <div className={`${styles.row} ${styles.delete}`}>
                <div className={styles.iconWrapper}>
                    <i className="fa-regular fa-trash-can"></i>
                </div>
                <div><button onClick={handleDeletePost}>Move to trash</button></div>
            </div>
        </div>
    );
};

export default DropDownPostManager;
