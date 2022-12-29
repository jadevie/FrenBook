import styles from './CommentForm.module.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../../../../store/posts';


const CommentForm = ({ post }) => {
    const dispatch = useDispatch();
    const [body, setBody] = useState('');
    const [id, setId] = useState(0);
    // const [errors, setErrors] = useState([]);

    const handleOnSubmit = async e => {
        e.preventDefault();
        const comment = { body };
        await dispatch(addComment(id, comment))
            .then(() => setBody(''));
        // .catch(e => {
        //     setErrors(e.errors);
        // });
    };

    return (
        <div>
            <div>
                <form onSubmit={handleOnSubmit} className={styles.addCommentWrapper}>
                    <div>
                        {/* {errors.length > 0 && errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))} */}
                    </div>
                    <textarea
                        className={styles.commentInput}
                        type='text'
                        placeholder='Write a comment'
                        onChange={e => {
                            setId(post.id);
                            setBody(e.target.value);
                        }}
                        value={body}
                    />
                    <button className={styles.post} type='submit' disabled={body ? false : true}>Post</button>
                </form>
            </div>
        </div>
    );
};

export default CommentForm;
