import { csrfFetch } from './csrf';

const CREATE_POST = 'posts/CREATE_POST';
const GET_POSTS = 'posts/GET_POSTS';
const GET_POSTS_BY_USER = 'posts/GET_POSTS_BY_USER';
const DELETE_POST = 'posts/DELETE_POST';

export const getPosts = () => async dispatch => {
    const response = await csrfFetch(`/api/posts`);
    const posts = await response.json();
    dispatch({ type: GET_POSTS, posts });
};

export const getPostsByUser = () => async dispatch => {
    const response = await csrfFetch(`/api/posts/current`);
    const posts = await response.json();
    dispatch({ type: GET_POSTS_BY_USER, posts });
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

export const deletePost = postId => async dispatch => {
    await csrfFetch(`/api/posts/delete/${postId}`, { method: 'DELETE' });
    dispatch({ type: DELETE_POST, postId });
};

const initialState = { allPosts: {}, singlePost: {} };
export default function postsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_POSTS:
            newState = { allPosts: {}, singlePost: {} };
            action.posts.posts.forEach(post => newState.allPosts[post.id] = post);
            return newState;
        case GET_POSTS_BY_USER:
            newState = {};
            action.posts.posts.forEach(post => newState.allPosts[post.id] = post);
            return newState;
        case CREATE_POST:
            newState = { ...state };
            newState.singlePost = action.post;
            return newState;
        case DELETE_POST:
            newState = { ...state };
            delete newState[action.postId];
            return newState;
        default:
            return state;
    }
}
