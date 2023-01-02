import styles from './DeleteCommentForm.module.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../../store/posts';
import { setDeleteCommentModal } from '../../../store/ui';
import { clearCommentDetails } from '../../../store/commentDetails';

const DeleteCommentForm = () => {
    const dispatch = useDispatch();
    const comment = useSelector(state => state.commentDetails.comment);

    const handleSubmit = async e => {
        e.preventDefault();
        await dispatch(deleteComment(comment))
            .then(() => dispatch(setDeleteCommentModal(false)))
            .then(() => dispatch(clearCommentDetails()));
    };

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.header}>Delete Comment?</h4>
            <p>Are you sure you want to delete this comment?</p>
            <div className={styles.decision}>
                <button onClick={() => dispatch(setDeleteCommentModal(false))} className={styles.no}>No</button>
                <button onClick={handleSubmit} className={styles.del}>Delete</button>
            </div>
        </div >
    );
};

export default DeleteCommentForm;
