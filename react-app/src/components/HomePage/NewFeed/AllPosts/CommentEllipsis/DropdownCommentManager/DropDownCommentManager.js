import styles from './DropDownCommentManager.module.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDeleteCommentModal } from '../../../../../../store/ui';
import { editComment, setCommentDetails } from '../../../../../../store/commentDetails';
import { getPosts } from '../../../../../../store/posts';

const DropDownCommentManager = ({ comment }) => {
    const dispatch = useDispatch();

    const handleEditComment = async comment => {
        document.getElementById('editComment').style.display = 'block';
        await dispatch(setCommentDetails(comment.id));
    };

    const handleDeleteComment = async e => {
        e.preventDefault();
        await dispatch(setCommentDetails(comment.id));
        await dispatch(setDeleteCommentModal(true));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <div>
                    <button onClick={() => {
                        handleEditComment(comment);
                    }}>Edit
                    </button>
                </div>
            </div>

            <div className={`${styles.row} ${styles.delete}`}>
                <div><button onClick={handleDeleteComment}>Delete</button></div>
            </div>
        </div >
    );
};

export default DropDownCommentManager;
