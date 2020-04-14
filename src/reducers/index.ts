import { combineReducers } from 'redux';

import authStore from './auth';

const reducers = {
    authStore
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
