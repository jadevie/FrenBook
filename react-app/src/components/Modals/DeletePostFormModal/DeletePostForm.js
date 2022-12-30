import styles from './DeletePostForm.module.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../../store/posts';
import { setDeletePostModal } from '../../../store/ui';


const DeletePostForm = () => {
    const dispatch = useDispatch();
    const post = useSelector(state => state.postDetails.post);

    const handleSubmit = async e => {
        e.preventDefault();
        await dispatch(deletePost(post.id))
            .then(() => dispatch(setDeletePostModal(false)));
    };

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.header}>Move to your trash?</h4>
            <p>Items in your trash will be automatically deleted after 30 days. You can delete them earlier from your Trash by going to Activity Log in Settings.</p>
            <div className={styles.decision}>
                <button onClick={() => dispatch(setDeletePostModal(false))}
                    className={styles.no}>Cancel</button>
                <button onClick={handleSubmit} className={styles.del}>Move</button>
            </div>
        </div >
    );
};

export default DeletePostForm;
