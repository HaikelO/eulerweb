import { FETCH_PORT } from '../actions/ActionsTypes';

const initialState = {
    port: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_PORT:
            return {
                ...state,
                port: action.payload.data,
            }
        default:
            return state;
    }
}