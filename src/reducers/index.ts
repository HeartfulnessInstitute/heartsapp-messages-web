import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authStore from './auth';

const reducers = {
    authStore,
    form: formReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
