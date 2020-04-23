

function messageForm(state = {
    data: {
        media: 'youtube',
        title: 'video'
    },
}, action) {
    switch (action.type) {
        // case FILL_FORM:
        //     return { ...state, data: action.data }
        default:
            return state;
    }
}

export default messageForm 
