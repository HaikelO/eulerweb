import { FETCH_ACCOUNT, LOGIN, LOGOUT } from '../actions/ActionsTypes';

const initialState = {
    isAuthenticated: false,
    info: {},
    id: null,
    isStudent: false,
    isTeacher: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ACCOUNT:
            return {
                ...state,
                info: action.payload.data,
            }
        case LOGIN:
            if (action.payload.data.status === 'ok') {
                return {
                    ...state,
                    isAuthenticated: true,
                    id:  action.payload.data.info.id,
                    isStudent: action.payload.data.info.isStudent,                  
                }
            } else {
                return {
                    ...state,
                    isAuthenticated: false,
                    id: null,
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