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
            <div>
                <button onClick={() => {
                    handleEditComment(comment);
                }} className={styles.row}>Edit
                </button>
            </div>

            <div>
                <button onClick={handleDeleteComment} className={styles.row}>Delete</button>
            </div>
        </div >
    );
};

export default DropDownCommentManager;
