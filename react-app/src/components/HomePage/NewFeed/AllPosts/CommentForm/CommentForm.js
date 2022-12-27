import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../../../../store/posts';
import { getPosts } from '../../../../../store/posts';


const CommentForm = ({ post }) => {
    const dispatch = useDispatch();
    const [body, setBody] = useState('');
    const [id, setId] = useState(0);
    const [errors, setErrors] = useState([]);

    const handleOnSubmit = async e => {
        e.preventDefault();
        const comment = { body };
        await dispatch(addComment(id, comment))
            .catch(e => {
                const errors = e.errors;
                setErrors(errors);
            });
        await dispatch(getPosts());
    };

    return (
        <div>
            <div>
                <form onSubmit={handleOnSubmit}>
                    <div>
                        {errors.length > 0 && errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <input
                        type='text'
                        placeholder='Write a comment'
                        onChange={e => {
                            setId(post.id);
                            setBody(e.target.value);
                        }}
                        value={body}
                    />
                    <button type='submit'>Post</button>
                </form>
            </div>
        </div>
    );
};

export default CommentForm;
