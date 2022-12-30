const SET_COMMENT_DETAILS = 'commentDetails/SET_COMMENT_DETAILS';
const CLEAR_COMMENT_DETAILS = 'commentDetailsCLEAR_COMMENT_DETAILS';

export const setCommentDetails = id => async dispatch => {
    const response = await fetch(`/api/comments/${id}`);
    const comment = await response.json();
    dispatch({ type: SET_COMMENT_DETAILS, comment });

};

export const clearCommentDetails = () => {
    return { type: CLEAR_COMMENT_DETAILS };
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
        default:
            return state;
    }
};;
