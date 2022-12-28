// import React, { useState } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../../store/commentDetails';
import { getPosts } from '../../../store/posts';
import { setDeleteCommentModal } from '../../../store/ui';

const DeleteCommentForm = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const comment = useSelector(state => state.commentDetails.comment);

    const handleSubmit = async e => {
        e.preventDefault();
        await dispatch(deleteComment(comment.id))
            .then(() => dispatch(setDeleteCommentModal(false)))
            .then(() => dispatch(getPosts()))
            .catch(e => {
                const errors = e.errors;
                setErrors(errors);
            });

    };

    return (
        <div>
            <h3>Are you sure you want to delete this comment?</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors.length > 0 && errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div><button onClick={() => dispatch(setDeleteCommentModal(false))}>Cancel</button></div>
                <button type='submit'>Delete</button>
            </form>
        </div>
    );
};

export default DeleteCommentForm;
