import styles from './DropDownCommentManager.module.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setDeleteCommentModal } from '../../../../../../store/ui';
import { setCommentDetails } from '../../../../../../store/commentDetails';

const DropDownCommentManager = ({ comment }) => {
    const dispatch = useDispatch();

    const handleEditComment = async comment => {
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
                    }} className={styles.word}>Edit
                    </button>
                </div>
            </div>

            <div className={`${styles.row} ${styles.delete}`}>
                <div><button onClick={handleDeleteComment} className={styles.word}>Delete</button></div>
            </div>
        </div >
    );
};

export default DropDownCommentManager;
