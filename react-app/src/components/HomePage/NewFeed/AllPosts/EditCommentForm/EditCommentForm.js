import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearCommentDetails } from '../../../../../store/commentDetails';
import { editComment } from '../../../../../store/posts';


const EditCommentForm = ({ comment }) => {
    const dispatch = useDispatch();
    const [body, setBody] = useState(comment.body);
    const [id, setId] = useState(0);
    // const [errors, setErrors] = useState([]);

    const handleOnSubmit = async e => {
        e.preventDefault();
        const comment = { body };
        await dispatch(editComment(id, comment))
            .then(() => dispatch(clearCommentDetails()));
        document.getElementById('editComment').style.display = 'none';
        // .catch(e => {
        //     const errors = e.errors;
        //     setErrors(errors);
        // });
    };

    return (
        <div>
            <div>
                <form onSubmit={handleOnSubmit}>
                    <div>
                        {/* {errors.length > 0 && errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))} */}
                    </div>
                    <input
                        type='text'
                        onChange={e => {
                            setId(comment.id);
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

export default EditCommentForm;
