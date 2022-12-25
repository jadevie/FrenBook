const SET_SIGNUP_MODAL = 'ui/setSignUpModal';
const SET_CREATE_POST_MODAL = 'ui/setCreatePostModal';
const SET_EDIT_POST_MODAL = 'ui/setEditPostModal';

export const setSignUpModal = showSignUpModal => { return { type: SET_SIGNUP_MODAL, showSignUpModal }; };

export const setCreatePostModal = showCreatePostModal => { return { type: SET_CREATE_POST_MODAL, showCreatePostModal }; };

export const setEditPostModal = showEditPostModal => { return { type: SET_EDIT_POST_MODAL, showEditPostModal }; };

export default function uiReducer(state = {}, action) {
    switch (action.type) {
        case SET_SIGNUP_MODAL:
            return { ...state, showSignUpModal: action.showSignUpModal };
        case SET_CREATE_POST_MODAL:
            return { state, showCreatePostModal: action.showCreatePostModal };
        case SET_EDIT_POST_MODAL:
            return { state, showEditPostModal: action.showEditPostModal };

        default:
            return state;
    }
};
