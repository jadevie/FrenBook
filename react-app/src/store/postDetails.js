const SET_POST_DETAILS = 'postDetails/SET_POST_DETAILS';
const CLEAR_POST_DETAILS = 'postDetails/CLEAR_POST_DETAILS';

export const setPostDetails = id => async dispatch => {
    const response = await fetch(`/api/posts/${id}`);
    const post = await response.json();
    dispatch({ type: SET_POST_DETAILS, post });

};

export const clearPostDetails = () => {
    return { type: CLEAR_POST_DETAILS };
};

export default function postDetailsReducer(state = {}, action) {
    let newState = { ...state };
    switch (action.type) {
        case SET_POST_DETAILS:
            newState = action.post;
            return newState;
        case CLEAR_POST_DETAILS:
            newState = {};
            return newState;
        default:
            return state;
    }
};;
