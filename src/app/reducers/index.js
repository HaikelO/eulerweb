import { combineReducers } from 'redux';
import AccountReducer from './AccountReducer';
import ConfigReducer from './ConfigReducer';
import TeachersReducer from './TeachersReducer';

const rootReducer = combineReducers({
    account: AccountReducer,
    config: ConfigReducer,
    teachers: TeachersReducer,
});

export default rootReducer;