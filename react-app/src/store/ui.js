const SET_SIGNUP_MODAL = 'ui/setRegisterModal';

export const setSignUpModal = showRegisterModal => { return { type: SET_SIGNUP_MODAL, showRegisterModal }; };

export default function uiReducer(state = {}, action) {
    switch (action.type) {
        case SET_SIGNUP_MODAL:
            return { ...state, showSignUpModal: action.showSignUpModal };
        default:
            return state;
    }
};
