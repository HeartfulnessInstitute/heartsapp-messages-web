
function authStore(state = {
    authState: 'not-initated',
}, action) {
    switch (action.type) {
        // case AUTHENTICTION_INIT:
        //     return { ...state }
        default:
            return state;
    }
}

export default authStore 
