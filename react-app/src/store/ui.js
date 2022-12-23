const SET_SIGNUP_MODAL = 'ui/setSignUpModal';

export const setSignUpModal = showSignUpModal => { return { type: SET_SIGNUP_MODAL, showSignUpModal }; };

export default function uiReducer(state = {}, action) {
    switch (action.type) {
        case SET_SIGNUP_MODAL:
            return { ...state, showSignUpModal: action.showSignUpModal };
        default:
            return state;
    }
};
