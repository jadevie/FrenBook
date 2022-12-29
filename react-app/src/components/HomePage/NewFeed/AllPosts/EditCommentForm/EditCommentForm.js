import styles from './EditCommentForm.module.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearCommentDetails } from '../../../../../store/commentDetails';
import { editComment } from '../../../../../store/posts';


const EditCommentForm = ({ comment }) => {
    const dispatch = useDispatch();
    const [body, setBody] = useState(comment.body);
    const [id, setId] = useState(comment.id);

    const handleOnSubmit = async e => {
        e.preventDefault();
        const comment = { body };
        await dispatch(editComment(id, comment))
            .then(() => dispatch(clearCommentDetails()));
    };

    return (
        <div>
            <div>
                <form onSubmit={handleOnSubmit} >
                    <textarea
                        id='textarea'
                        className={styles.editInput}
                        name='edit'
                        type='text'
                        onChange={e => {
                            setId(comment.id);
                            setBody(e.target.value);
                        }}
                        value={body}
                    />
                    <button type='submit' className={styles.post}>Post</button>
                </form>
            </div>
        </div>
    );
};

export default EditCommentForm;
