const SET_COMMENT_DETAILS = 'postDetails/SET_COMMENT_DETAILS';
const EDIT_COMMENT = 'postDetails/EDIT_COMMENT';
const DELETE_COMMENT = 'postDetails/DELETE_COMMENT';

export const setCommentDetails = id => async dispatch => {
    const response = await fetch(`/api/comments/${id}`);
    const comment = await response.json();
    dispatch({ type: SET_COMMENT_DETAILS, comment });

};

export const editComment = (id, comment) => async dispatch => {
    const response = await fetch(`api/comments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch({ type: EDIT_COMMENT, comment });
        return data;
    }
    if (response.status >= 400) {
        const errors = await response.json();
        throw errors;
    }
};

export const deleteComment = (id) => async dispatch => {
    await fetch(`/api/comments/${id}`, { method: 'DELETE' });
    dispatch({ type: DELETE_COMMENT, id });
};
export default function commentDetailsReducer(state = {}, action) {
    let newState = { ...state };
    switch (action.type) {
        case SET_COMMENT_DETAILS:
            newState = action.comment;
            return newState;
        case EDIT_COMMENT:
            newState = action.comment;
            return newState;
        case DELETE_COMMENT:
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
};;
