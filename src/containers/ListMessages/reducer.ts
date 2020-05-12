
import { GET_MESSAGES_LIST } from './actions';

function messageStore(state = {
    messages: [],
}, action) {
    switch (action.type) {
        case GET_MESSAGES_LIST:
            return { ...state, messages: action.messages }
        default:
            return state;
    }
}

export default messageStore 
