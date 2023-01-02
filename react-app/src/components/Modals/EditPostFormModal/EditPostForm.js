import styles from './EditPostForm.module.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPostImage, deleteImage, updatePost } from '../../../store/posts';
import { setEditPostModal } from '../../../store/ui';


const EditPostForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const post = useSelector(state => state.postDetails.post);

    const [body, setBody] = useState(post.body);
    const [oldImage, setOldImage] = useState(post.images[0]?.image_url);
    const [image, setImage] = useState('');
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState([]);


    const onSubmit = async e => {
        e.preventDefault();
        const updatedPost = { body };
        await dispatch(updatePost(post.id, updatedPost));
        if (image) {
            await dispatch(addPostImage(post.id, image, preview))
                .then(() => dispatch(setEditPostModal(false)))
                .catch(e => {
                    const errors = e.errors;
                    setErrors(errors);
                });
        }
        else dispatch(setEditPostModal(false));
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

    const handleDeleteImage = async e => {
        e.preventDefault();
        if (post.images.length > 0)
            await dispatch(deleteImage(post.id, post.images[0].id));
        document.getElementById('del').style.display = 'none';
        setOldImage('');
    };

    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.header}>Edit Post</div>
                <div className={styles.userInfo}>
                    <img src={user.profile_picture_url} alt='' className={styles.userPhoto} />
                    <div>{user.username}</div>
                </div>

                <div>
                    <form onSubmit={onSubmit} className={styles.form}>
                        <div>
                            {errors.length > 0 && errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
                        <textarea
                            type='text'
                            onChange={e => setBody(e.target.value)}
                            value={body}
                            className={styles.body}
                            required={true}
                        />
                        {oldImage ? <img src={oldImage} alt='' className={styles.preview} id='del' onError={e => e.target.style.display = 'none'} /> :
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
                            </label>}

                        <div>
                            <button onClick={oldImage ? handleDeleteImage : handleChangeImage} className={styles.changeImage}>{oldImage ? 'handleDeleteImage' : 'handleChangeImage'}</button>
                        </div>

                        <img id='postImage' alt='' src={preview && URL.createObjectURL(image)} className={`${preview ? styles.preview : styles.notReady}`} />

                        <button type='submit' className={`${body ? styles.ready : styles.notReadyPost} ${oldImage ? styles.newPost : styles.post}`} disabled={body ? false : true}>Post</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPostForm;
