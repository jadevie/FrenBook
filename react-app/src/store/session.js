import { csrfFetch } from './csrf';

const SET_USER = 'session/SET_USER';

const setUser = user => {
    return { type: SET_USER, user };
};

export const restoreUser = () => async dispatch => {
    try {
        const response = await csrfFetch('/api/session');
        const user = await response.json();
        await dispatch(setUser(user));
        return response;
    } catch (errorResponse) {
        console.log("Couldn't restore user");
    }
};

export const logIn = credentials => async dispatch => {
    const response = await csrfFetch('/api/session/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
    });

    const user = await response.json();
    await dispatch(setUser(user));
    return user;
};

export const logOut = () => async (dispatch) => {
    await csrfFetch('/api/session/logout');
    await dispatch(setUser(null));
};


export const signUp = (
    firstName,
    lastName,
    username,
    email,
    password,
    gender,
    birthday) => async (dispatch) => {
        const response = await csrfFetch('/api/session/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
                gender,
                first_name: firstName,
                last_name: lastName,
                birthday
            }),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(setUser(data));
            return null;
        }
    };

export default function sessionReducer(state = { user: null }, action) {
    const newState = { ...state };
    switch (action.type) {
        case SET_USER:
            newState.user = action.user;
            return newState;
        default:
            return state;
    }
};
