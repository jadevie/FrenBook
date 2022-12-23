

import { csrfFetch } from './csrf';

const GET_POSTS = 'posts/GET_POSTS';
const CREATE_POST = 'posts/CREATE_POST';
const UPDATE_POST = 'posts/UPDATE_POST';
const DELETE_POST = 'posts/DELETE_POST';

export const getPosts = () => async dispatch => {
    const response = await csrfFetch(`/api/posts`);
    const posts = await response.json();
    dispatch({ type: GET_POSTS, posts });
};

export const addPost = post => async dispatch => {
    const response = await csrfFetch(`/api/posts`, {
        method: 'POST',
        post: JSON.stringify(post)
    });
    const data = await response.json();
    dispatch({ type: CREATE_POST, post });
    return data;
};

export const deletePost = postId => async dispatch => {
    await csrfFetch(`/api/posts/${postId}`, { method: 'DELETE' });
    dispatch({ type: DELETE_POST, postId });
};

export default function postsReducer(state = {}, action) {
    const newState = { ...state };
    switch (action.type) {
        case GET_POSTS:
            action.posts.posts.forEach(post => newState[post.id] = post);
            return newState;
        case CREATE_POST:
            newState[action.post.id] = action.post;
            return newState;
        case DELETE_POST:
            delete newState[action.postId];
            return newState;
        default:
            return state;
    }
}
