
import {FILL_FORM} from '../../components/Message/action'
function messageForm(state = {
    data: {
        media: '',
        title: ''
    },
}, action) {
    switch (action.type) {
        case FILL_FORM:
            return { ...state, data: action.value }
        default:
            return state;
    }
}

export default messageForm 
