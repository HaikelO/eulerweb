import { NEW_MESSAGE, FETCH_MESSAGES } from '../actions/ActionsTypes';

const initialState = {
    messages: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case NEW_MESSAGE:
            console.log('Action', action)
            return {
                ...state,
                messages: [...state.messages, action.payload],
            }
        case FETCH_MESSAGES:
            return {
                ...state,
                messages: action.payload.data,
            }
        default:
            return state;
    }
}