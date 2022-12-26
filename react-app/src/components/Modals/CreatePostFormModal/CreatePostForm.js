// import styles from './CreatePostForm.module.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, addPostImage } from '../../../store/postDetails';
import { getPosts } from '../../../store/posts';
import { setCreatePostModal } from '../../../store/ui';

const CreatePostForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState([]);

    const onSubmit = async e => {
        e.preventDefault();
        const post = { body };
        const newPost = await dispatch(addPost(post))
            .catch(e => {
                const errors = e.errors;
                setErrors(errors);
            });

        if (newPost) {
            const id = newPost.id;
            await dispatch(addPostImage(id, image, preview))
                .then(() => dispatch(setCreatePostModal(false)))
                .then(() => dispatch(getPosts()))
                .catch(e => {
                    const errors = e.errors;
                    setErrors(errors);
                });
        }
    };

    const handleImage = e => {
        // Show thumbnail preview before submit post
        e.preventDefault();
        setImage(e.target.files[0]);
        const reader = new FileReader();
        reader.onload = function (e) {
            e.preventDefault();
            setPreview(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
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
                <input
                    type='file'
                    name='image'
                    onChange={handleImage}
                    accept='image/*'
                />
                <img id='postImage' alt='postImage' src={preview && URL.createObjectURL(image)} />
                <button type='submit'>Post</button>
            </form>
        </div>
    );
};

export default CreatePostForm;
