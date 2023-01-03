import styles from './CommentForm.module.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../../../../store/posts';
import TextareaAutosize from 'react-autosize-textarea';

const CommentForm = ({ post }) => {
    const dispatch = useDispatch();
    const [body, setBody] = useState('');
    const [id, setId] = useState(0);

    const handleOnSubmit = async e => {
        if (e) e.preventDefault();
        const comment = { body };
        await dispatch(addComment(id, comment))
            .then(() => setBody(''));
    };

    return (
        <div>
            <div>
                <form className={styles.addCommentWrapper}>
                    <TextareaAutosize
                        value={body}
                        onChange={e => {
                            setId(post.id);
                            setBody(e.target.value);
                        }}
                        placeholder='Write a comment'
                        className={styles.commentInput}
                        type='submit'

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

export default CommentForm;
