import styles from './CreatePost.module.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setCreatePostModal } from '../../../../store/ui';

const CreatePost = ({ user }) => {
    console.log(user);
    const dispatch = useDispatch();

    const handleOnClick = async e => {
        e.preventDefault();
        await dispatch(setCreatePostModal(true));
    };

    return (
        <div className={styles.lineWrapper}>
            <div className={styles.createPostWrapper}>
                <div className={styles.profilePictureWrapper}>
                    <img src={`${user.profile_picture_url}`} alt='profile' className={styles.profilePicture} />
                </div>
                <button onClick={handleOnClick} className={styles.question}>
                    What's on your mind, {user.first_name}?
                </button>
            </div>
            <div className={styles.line}></div>

            <div className={styles.uploadPhotoWrapper}>
                <button className={styles.photoIcon} onClick={handleOnClick}>
                    <i className="fa-sharp fa-solid fa-images"></i>
                </button>
                <span>
                    <button onClick={handleOnClick} className={styles.uploadPhoto}>Photo
                    </button>
                </span>

            </div>
        </div>
    );
};

export default CreatePost;
