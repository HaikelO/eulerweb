import { combineReducers } from 'redux';
import AccountReducer from './AccountReducer';
import TeachersReducer from './TeachersReducer';

const rootReducer = combineReducers({
    account: AccountReducer,
    teachers: TeachersReducer,
});

export default rootReducer;