import { FETCH_TEACHERS } from '../actions/ActionsTypes';

const initialState = {
    list: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TEACHERS:
            return {
                ...state,
                list: action.payload.data,
            }        
        default:
            return state;
    }
}