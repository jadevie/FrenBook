const GET_POSTS = 'posts/GET_POSTS';
const CREATE_POST = 'posts/CREATE_POST';
const ADD_IMAGE = 'posts/ADD_IMAGE';
const UPDATE_POST = 'posts/UPDATE_POST';
const ADD_COMMENT = 'posts/ADD_COMMENT';
const DELETE_POST = 'postDetails/DELETE_POST';


export const getPosts = () => async dispatch => {
    const response = await fetch(`/api/posts`);
    const posts = await response.json();
    dispatch({ type: GET_POSTS, posts });
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

export const addComment = (id, comment) => async dispatch => {
    const response = await fetch(`/api/posts/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });

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

export const deletePost = postId => async dispatch => {
    await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
    dispatch({ type: DELETE_POST, postId });
};

export default function postsReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_POSTS:
            newState = { ...state };
            action.posts.posts.forEach(post => newState[post.id] = post);
            return newState;
        // case CREATE_POST:
        //     newState = { ...state };
        //     newState[action.post.id] = action.post;
        //     return newState;
        // case ADD_IMAGE:
        //     newState = { ...state };
        //     newState[action.postImage] = action.postImage;
        //     return newState;
        case DELETE_POST:
            newState = { ...state };
            delete newState[action.postId];
            return newState;
        default:
            return state;
    }
}
