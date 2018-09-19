import { FETCH_ACCOUNT, LOGIN, LOGOUT } from '../actions/ActionsTypes';

const initialState = {
    isAuthenticated: false,
    info: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ACCOUNT:
            return {
                ...state,
                info: action.payload.data,
            }
        case LOGIN:
            if (action.status === 'ok') {
                return {
                    ...state,
                    isAuthenticated: true,
                }
            } else {
                return {
                    ...state,
                    isAuthenticated: false,
                }
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false
            }
        default:
            return state;
    }
}