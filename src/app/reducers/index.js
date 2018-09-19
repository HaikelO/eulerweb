import { combineReducers } from 'redux';
import AccountReducer from './AccountReducer';

const rootReducer = combineReducers({
    account: AccountReducer,
});

export default rootReducer;