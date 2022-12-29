import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../../store/posts';
import { setDeleteCommentModal } from '../../../store/ui';

const DeleteCommentForm = () => {
    const dispatch = useDispatch();
    const comment = useSelector(state => state.commentDetails.comment);

    const handleSubmit = async e => {
        e.preventDefault();
        await dispatch(deleteComment(comment))
            .then(() => dispatch(setDeleteCommentModal(false)));
    };

    return (
        <div>
            <h3>Are you sure you want to delete this comment?</h3>
            <form onSubmit={handleSubmit}>
                <div><button onClick={() => dispatch(setDeleteCommentModal(false))}>Cancel</button></div>
                <button type='submit'>Delete</button>
            </form>
        </div>
    );
};

export default DeleteCommentForm;
