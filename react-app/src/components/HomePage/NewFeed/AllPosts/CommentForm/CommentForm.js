import styles from './CommentForm.module.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../../../../store/posts';
// import TextareaAutosize from 'react-autosize-textarea';

const CommentForm = ({ post, i }) => {
    const dispatch = useDispatch();
    const [body, setBody] = useState('');
    const [id, setId] = useState(1);
    const [errors, setErrors] = useState([]);

    const handleOnSubmit = async e => {
        if (e) e.preventDefault();
        
        const comment = { body };
        await dispatch(addComment(id, comment))
            .catch(e => {
                const errors = e.errors;
                setErrors(errors);
            });
        setBody('');
    };

    const onEnter = e => {
        if (e.which === 13 && !e.shiftKey) {
            handleOnSubmit();
        }
    };

    return (
        <div>
            <div>
                <form className={styles.addCommentWrapper}>
                    {/* <TextareaAutosize */}
                    <textarea
                        id={i}
                        value={body}
                        onChange={e => {
                            setId(post.id);
                            setBody(e.target.value);
                            setErrors([]);
                        }}
                        placeholder='Write a comment'
                        className={styles.commentInput}
                        type='submit'
                        onKeyDown={onEnter}

                    />
                </form>
                <div>
                    {errors && errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommentForm;
