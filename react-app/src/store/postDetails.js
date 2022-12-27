const SET_POST_DETAILS = 'postDetails/SET_POST_DETAILS';
const CREATE_POST = 'postDetails/CREATE_POST';
const ADD_IMAGE = 'postDetails/ADD_IMAGE';
const UPDATE_POST = 'postDetails/UPDATE_POST';
const ADD_COMMENT = 'postDetails/ADD_COMMENT';


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
    if (response.status >= 400) {
        const errors = await response.json();
        throw errors;
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
    if (response.status >= 400) {
        const errors = await response.json();
        throw errors;
    }
};

export const addComment = (id, comment) => async dispatch => {
    const response = await fetch(`/api/posts/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });
    console.log(comment);

    if (response.ok) {
        const data = await response.json();
        dispatch({ type: ADD_COMMENT, comment });
        return data;
    }
    if (response.status >= 400) {
        const errors = await response.json();
        throw errors;
    }
};

export const updatePost = (id, post) => async dispatch => {
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch({ type: UPDATE_POST, post });
        return data;
    }
    if (response.status >= 400) {
        const errors = await response.json();
        throw errors;
    }
};


export default function postDetailsReducer(state = {}, action) {
    let newState = { ...state };
    switch (action.type) {
        case SET_POST_DETAILS:
            newState = action.post;
            return newState;
        default:
            return state;
    }
};;
