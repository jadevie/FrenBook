import styles from './DropDownPostManager.module.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setDeletePostModal, setEditPostModal } from '../../../../../../store/ui';
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
        await dispatch(setDeletePostModal(true));
    };

    return (
        <div className={styles.wrapper}>
            <button onClick={() => handleEditPost(post)}>
                <span className={styles.row}>
                    <div className={styles.iconWrapper}>
                        <i className="fa-solid fa-pen"></i>
                    </div>
                    <div className={styles.name}>Edit post</div>
                </span>
            </button>


            <button onClick={handleDeletePost}>
                <span className={styles.row}>
                    <div className={styles.iconWrapper}>
                        <i className="fa-regular fa-trash-can"></i>
                    </div>
                    <div className={styles.name}>Move to trash</div>
                </span>
            </button>
        </div >
    );
};

export default DropDownPostManager;
