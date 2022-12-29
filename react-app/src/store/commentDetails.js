const SET_COMMENT_DETAILS = 'commentDetails/SET_COMMENT_DETAILS';
const CLEAR_COMMENT_DETAILS = 'commentDetailsCLEAR_COMMENT_DETAILS';
// const EDIT_COMMENT = 'commentDetails/EDIT_COMMENT';
const DELETE_COMMENT = 'commentDetails/DELETE_COMMENT';

export const setCommentDetails = id => async dispatch => {
    const response = await fetch(`/api/comments/${id}`);
    const comment = await response.json();
    dispatch({ type: SET_COMMENT_DETAILS, comment });

};

export const clearCommentDetails = () => {
    return { type: CLEAR_COMMENT_DETAILS };
};


// export const editComment = (id, comment) => async dispatch => {
//     const response = await fetch(`api/comments/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(comment)
//     });
//     if (response.ok) {
//         const data = await response.json();
//         dispatch({ type: EDIT_COMMENT, comment: data });
//         return data;
//     }
//     if (response.status >= 400) {
//         const errors = await response.json();
//         throw errors;
//     }
// };

export const deleteComment = (comment) => async dispatch => {
    await fetch(`/api/comments/${comment.id}`, { method: 'DELETE' });
    dispatch({ type: DELETE_COMMENT, comment });
};


export default function commentDetailsReducer(state = {}, action) {
    let newState = { ...state };
    switch (action.type) {
        case SET_COMMENT_DETAILS:
            newState = action.comment;
            return newState;
        case CLEAR_COMMENT_DETAILS:
            newState = {};
            return newState;
        // case EDIT_COMMENT:
        //     newState = action.comment;
        //     return newState;
        case DELETE_COMMENT:
            delete newState[action.comment.id];
            return newState;
        default:
            return state;
    }
};;
