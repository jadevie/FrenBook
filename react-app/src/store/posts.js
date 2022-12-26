import { csrfFetch } from './csrf';


const GET_POSTS = 'posts/GET_POSTS';
const GET_POSTS_BY_USER = 'posts/GET_POSTS_BY_USER';


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



export default function postsReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_POSTS:
            newState = { ...state };
            action.posts.posts.forEach(post => newState[post.id] = post);
            return newState;
        case GET_POSTS_BY_USER:
            newState = { ...state };
            action.posts.posts.forEach(post => newState[post.id] = post);
            return newState;
        default:
            return state;
    }
}

// const initialState = { allPosts: {}, singlePost: {} };
// export default function postsReducer(state = initialState, action) {
//     let newState;
//     switch (action.type) {
//         case GET_POSTS:
//             newState = { allPosts: {}, singlePost: {} };
//             action.posts.posts.forEach(post => newState.allPosts[post.id] = post);
//             return newState;
//         // case GET_POSTS_BY_USER:
//         //     newState = {};
//         //     action.posts.posts.forEach(post => newState.allPosts[post.id] = post);
//         //     return newState;
//         case CREATE_POST:
//             newState = { ...state };
//             newState.singlePost = action.post;
//             return newState;
//         case DELETE_POST:
//             newState = { ...state };
//             delete newState[action.postId];
//             return newState;
//         default:
//             return state;
//     }
// }
