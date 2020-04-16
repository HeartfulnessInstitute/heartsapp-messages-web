
import { SIGN_IN } from '../../actions/auth';

function authStore(state = {
    authorized: false,
}, action) {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, authorized: true }
        default:
            return state;
    }
}

export default authStore 
