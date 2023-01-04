import styles from './EditCommentForm.module.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearCommentDetails } from '../../../../../store/commentDetails';
import { editComment } from '../../../../../store/posts';
// import TextareaAutosize from 'react-autosize-textarea';
import { setDeleteCommentModal } from '../../../../../store/ui';

const EditCommentForm = ({ comment }) => {
    const dispatch = useDispatch();
    const [body, setBody] = useState(comment.body);
    const [id, setId] = useState(comment.id);

    const handleOnSubmit = async e => {
        if (e) e.preventDefault();
        const comment = { body };
        if (!body.trim().length) dispatch(setDeleteCommentModal(true));
        else await dispatch(editComment(id, comment))
            .then(() => dispatch(clearCommentDetails()));
    };

    return (
        <div>
            <div>
                <form>
                    {/* <TextareaAutosize */}
                    <textarea
                        className={styles.editInput}
                        type='submit'
                        onChange={e => {
                            setId(comment.id);
                            setBody(e.target.value);
                        }}
                        value={body}
                        onKeyDown={e => {
                            if (e.which === 13 && !e.shiftKey) {
                                handleOnSubmit();
                            }
                        }}
                    />
                </form>
            </div>
        </div>
    );
};

export default EditCommentForm;
