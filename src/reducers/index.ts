import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authStore from './auth';
import loaderStore from './loaders';
import messageStore from '../containers/ListMessages/reducer';
import messageForm from './messageForm';


const reducers = {
    authStore,
    loaderStore,
    messageStore,
    messageForm,
    form: formReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
