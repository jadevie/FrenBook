const SET_SIGNUP_MODAL = 'ui/setSignUpModal';
const SET_CREATE_POST_MODAL = 'ui/setCreatePostModal';
const SET_EDIT_POST_MODAL = 'ui/setEditPostModal';
const SET_DELETE_POST_MODAL = 'ui/setDeletePostModal';
const SET_DELETE_COMMENT_MODAL = 'ui/setDeleteCommentModal';

export const setSignUpModal = showSignUpModal => { return { type: SET_SIGNUP_MODAL, showSignUpModal }; };

export const setCreatePostModal = showCreatePostModal => { return { type: SET_CREATE_POST_MODAL, showCreatePostModal }; };

export const setEditPostModal = showEditPostModal => { return { type: SET_EDIT_POST_MODAL, showEditPostModal }; };

export const setDeletePostModal = showDeletePostModal => { return { type: SET_DELETE_POST_MODAL, showDeletePostModal }; };

export const setDeleteCommentModal = showDeleteCommentModal => { return { type: SET_DELETE_COMMENT_MODAL, showDeleteCommentModal }; };

export default function uiReducer(state = {}, action) {
    switch (action.type) {
        case SET_SIGNUP_MODAL:
            return { ...state, showSignUpModal: action.showSignUpModal };
        case SET_CREATE_POST_MODAL:
            return { state, showCreatePostModal: action.showCreatePostModal };
        case SET_EDIT_POST_MODAL:
            return { state, showEditPostModal: action.showEditPostModal };
        case SET_DELETE_POST_MODAL:
            return { state, showDeletePostModal: action.showDeletePostModal };
        case SET_DELETE_COMMENT_MODAL:
            return { state, showDeleteCommentModal: action.showDeleteCommentModal };
        default:
            return state;
    }
};
