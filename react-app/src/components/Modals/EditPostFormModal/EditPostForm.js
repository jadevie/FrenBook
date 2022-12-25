// import styles from './EditPostForm.module.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../../store/postDetails';
import { getPosts } from '../../../store/posts';
import { setEditPostModal } from '../../../store/ui';


const EditPostForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const post = useSelector(state => state.postDetails.post);

    const [body, setBody] = useState(post.body);
    const [errors, setErrors] = useState([]);


    const onSubmit = async e => {
        e.preventDefault();
        const updatedPost = { body };
        await dispatch(updatePost(post.id, updatedPost))
            .then(() => dispatch(setEditPostModal(false)))
            .then(() => dispatch(getPosts()))
            .catch(e => {
                const errors = e.errors;
                setErrors(errors);
            });
    };

    return (
        <div>
            <div>Edit Post</div>
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
                    onChange={e => setBody(e.target.value)}
                    value={body}
                />
                <button type='submit'>Post</button>
            </form>
        </div>
    );
};

export default EditPostForm;
