
import { SET_MESSAGES_LIST_LOADER } from '../../containers/ListMessages/actions';

function loadersStore(state = {
    loaders: {},
}, action) {
    switch (action.type) {
        case SET_MESSAGES_LIST_LOADER: {
            return { ...state, loaders: { [action.loaderType]: action.loading} }
        }
        default:
            return state;
    }
}

export default loadersStore 
