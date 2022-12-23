import styles from './CreatePostForm.module.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../../store/posts';
import { setCreatePostModal } from '../../../store/ui';


const CreatePostForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState([]);

    const onSubmit = async e => {
        e.preventDefault();
        const post = { body };
        await dispatch(addPost(post))
            .then(() => setCreatePostModal(false))
            .catch(e => {
                setErrors(errors);
            });

    };

    return (
        <div>
            <div>Create Post</div>
            <div>{user.profile_picture_url}</div>
            <div>{user.username}</div>
            <form onSubmit={onSubmit}>
                <div>
                    {errors.length > 0 && errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <input
                    type='text'
                    placeholder={`What's on your mind, ${user.first_name}`}
                    onChange={e => setBody(e.target.value)}
                    value={body}
                />
                <button type='submit'>Post</button>
            </form>
        </div>
    );
};

export default CreatePostForm;
