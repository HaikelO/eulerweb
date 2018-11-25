import { combineReducers } from 'redux';
import AccountReducer from './AccountReducer';
import ConfigReducer from './ConfigReducer';

const rootReducer = combineReducers({
    account: AccountReducer,
    config: ConfigReducer,
});

export default rootReducer;