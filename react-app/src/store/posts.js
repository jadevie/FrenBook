const GET_POSTS = 'posts/GET_POSTS';
const CREATE_POST = 'posts/CREATE_POST';
const ADD_IMAGE = 'posts/ADD_IMAGE';
const UPDATE_POST = 'posts/UPDATE_POST';
const ADD_COMMENT = 'posts/ADD_COMMENT';
const DELETE_POST = 'posts/DELETE_POST';
const EDIT_COMMENT = 'posts/EDIT_COMMENT';
const DELETE_COMMENT = 'posts/DELETE_COMMENT';
const DELETE_IMAGE = 'posts/DELETE_IMAGE';
const ADD_LIKE = 'posts/ADD_LIKE';
const REMOVE_LIKE = 'posts/REMOVE_LIKE';

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

        dispatch({ type: CREATE_POST, post: data });
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
        dispatch({ type: UPDATE_POST, post: data });
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
        dispatch({ type: ADD_COMMENT, comment: data });
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


export const editComment = (id, comment) => async dispatch => {
    const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch({ type: EDIT_COMMENT, comment: data });
        return data;
    }
    if (response.status >= 400) {
        const errors = await response.json();
        throw errors;
    }
};

export const deleteComment = (comment) => async dispatch => {
    await fetch(`/api/comments/${comment.id}`, { method: 'DELETE' });
    dispatch({ type: DELETE_COMMENT, comment });
};

export const deleteImage = (postId, imageId) => async dispatch => {
    await fetch(`/api/posts/${postId}/images/${imageId}`, { method: 'DELETE' });
    dispatch({ type: DELETE_IMAGE, postId, imageId });
};

export const addLike = (like) => async dispatch => {
    const response = await fetch(`api/posts/${like.post_id}/likes`, {
        method: 'POST',
        body: JSON.stringify(like)
    });
    if (response.ok) {
        const data = await response.json();

        dispatch({ type: ADD_LIKE, data });
        return data;
    }
    if (response.status >= 400) {
        const errors = await response.json();
        throw errors;
    }
};

export const removeLike = (like) => async dispatch => {
    await fetch(`/api/posts/${like.post_id}/likes/delete`, { method: 'DELETE' });
    dispatch({ type: REMOVE_LIKE, like });
};

const initialState = { allPosts: {}, post: {} };
export default function postsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_POSTS:
            newState = { allPosts: {}, post: {} };
            action.posts.posts.forEach(post => newState.allPosts[post.id] = post);
            return newState;
        case CREATE_POST:
            newState = { ...state };
            newState.allPosts[action.post.id] = action.post;
            return newState;
        case UPDATE_POST:
            newState = { ...state };
            newState.allPosts[action.post.id] = action.post;
            return newState;
        case ADD_IMAGE:
            newState = { ...state };
            newState.allPosts[action.postImage.post_id].images.push(action.postImage);
            return newState;
        case DELETE_IMAGE:
            newState = { ...state };
            const imageArray = newState.allPosts[action.postId].images;
            imageArray.forEach((image, i) => image.id === action.imageId ? imageArray.splice(i, 1) : null);
            return newState;
        case DELETE_POST:
            newState = { ...state };
            delete newState.allPosts[action.postId];
            return newState;
        case ADD_COMMENT:
            newState = { ...state };
            newState.allPosts[action.comment.post_id].comments.push(action.comment);
            return newState;
        case EDIT_COMMENT:
            newState = { ...state };
            newState.allPosts[action.comment.post_id].comments.forEach(cmt => cmt.id === action.comment.id ? (
                Object.assign(cmt, action.comment)) : null);
            return newState;
        case DELETE_COMMENT:
            newState = { ...state };
            let array = newState.allPosts[action.comment.post_id].comments;
            array.forEach((comment, i) => comment.id === action.comment.id ? array.splice(i, 1) : null);
            return newState;
        case ADD_LIKE:
            newState = { ...state };
            newState.allPosts[action.data.post_id].likes.push(action.data);
            return newState;
        case REMOVE_LIKE:
            newState = { ...state };
            let likeArray = newState.allPosts[action.like.post_id].likes;
            if (likeArray) {
                likeArray.map((like, i) => like.user_id === action.like.user_id ? likeArray.splice(i, 1) : null);
            }
            return newState;
        default:
            return state;
    }
}
