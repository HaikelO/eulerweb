import { combineReducers } from 'redux';
import AccountReducer from './AccountReducer';
import ConfigReducer from './ConfigReducer';
import TeachersReducer from './TeachersReducer';
import ChatReducer from './ChatReducer';

const rootReducer = combineReducers({
    account: AccountReducer,
    config: ConfigReducer,
    teachers: TeachersReducer,
    chat: ChatReducer,
});

export default rootReducer;