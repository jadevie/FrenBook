import { csrfFetch } from './csrf';

const SET_POST_DETAILS = 'postDetails/SET_POST_DETAILS';
const CREATE_POST = 'postDetails/CREATE_POST';
const ADD_IMAGE = 'postDetails/ADD_IMAGE';
const DELETE_POST = 'postDetails/DELETE_POST';
const UPDATE_POST = 'postDetails/UPDATE_POST';


export const setPostDetails = id => async dispatch => {
    const response = await fetch(`/api/posts/${id}`);
    const post = await response.json();
    dispatch({ type: SET_POST_DETAILS, post });

};

export const addPost = post => async dispatch => {
    const response = await fetch(`/api/posts/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch({ type: CREATE_POST, post });
        return data;
    }
};

export const addPostImage = (id, image, preview) => async dispatch => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('image_url', preview);

    const response = await fetch(`/api/posts/${id}/images/new`, {
        method: 'POST',
        body: formData
    });
    if (response.ok) {
        const postImage = await response.json();
        dispatch({ type: ADD_IMAGE, postImage });
        return postImage;
    }
};

export const updatePost = (id, post) => async dispatch => {
    const response = await fetch(`/ api / posts / ${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch({ type: UPDATE_POST, post });
        return data;
    }
};

export const deletePost = id => async dispatch => {
    await csrfFetch(`/ api / posts / ${id}`, { method: 'DELETE' });
    dispatch({ type: DELETE_POST, id });
};

export default function postDetailsReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case SET_POST_DETAILS:
            newState = { ...state, ...action.post };
            return newState;
        case CREATE_POST:
            newState = { ...state, ...action.post };
            return newState;
        case ADD_IMAGE:
            newState = { ...state };
            newState.images = action.postImage;
            return newState;
        case UPDATE_POST:
            newState = { ...state, ...action.post };
            return newState;
        case DELETE_POST:
            newState = { ...state };
            delete newState['post'];
            return newState;
        default:
            return state;
    }
};;
