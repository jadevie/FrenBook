import styles from './CreatePostForm.module.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, addPostImage } from '../../../store/posts';
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
      
        if (newPost && image) {
            const id = newPost.id;
            await dispatch(addPostImage(id, image, preview))
                .then(() => dispatch(setCreatePostModal(false)))
                .catch(e => {
                    const errors = e.errors;
                    setErrors(errors);
                });
        }
        else dispatch(setCreatePostModal(false));
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

    const handleChangeImage = e => {
        e.preventDefault();
        setPreview(null);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>Create Post</div>
            <div className={styles.userInfo}>
                <img src={user.profile_picture_url} alt='' className={styles.userPhoto} />
                <div>{user.username}</div>
            </div>
            <form onSubmit={onSubmit} className={styles.form}>
                <div>
                    {errors.length > 0 && errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <textarea
                    type='text'
                    placeholder={`What's on your mind, ${user.first_name}?`}
                    onChange={e => setBody(e.target.value)}
                    value={body}
                    className={styles.body}
                // required={true}
                />
                <label>
                    <div className={styles.photoIcon}>
                        <i className="fa-regular fa-images"></i>
                    </div>
                    <div className={styles.addPhoto}>Add Photo</div>
                    <input
                        type='file'
                        name='image'
                        onChange={handleImage}
                        accept='.png, .jpg, .jpeg'
                        className={styles.file}
                    />
                </label>

                <div><button onClick={handleChangeImage} className={preview ? styles.changeImage : styles.notReady}>x</button></div>

                <img id='postImage' alt='' src={preview && URL.createObjectURL(image)} className={`${preview ? styles.preview : styles.notReady}`} />

                <button type='submit' className={`${styles.post} ${(body.trim().length || preview) ? styles.ready : styles.notReadyPost}`} disabled={body.trim().length || preview ? false : true}>Post</button>
            </form>
        </div >
    );
};

export default CreatePostForm;;
