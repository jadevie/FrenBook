// import React, { useState } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../../store/posts';
import { setDeletePostModal } from '../../../store/ui';



const DeletePostForm = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const post = useSelector(state => state.postDetails.post);

    const handleSubmit = async e => {
        e.preventDefault();
        await dispatch(deletePost(post.id))
            .then(() => dispatch(setDeletePostModal(false)))
            .catch(e => {
                const errors = e.errors;
                setErrors(errors);
            });
    };

    return (
        <div>
            <h3>Move to your trash?</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors.length > 0 && errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div><button onClick={() => dispatch(setDeletePostModal(false))}>Cancel</button></div>
                <button type='submit'>Move</button>
            </form>
        </div>
    );
};

export default DeletePostForm;
