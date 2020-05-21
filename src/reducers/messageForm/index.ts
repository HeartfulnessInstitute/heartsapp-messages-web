

function messageForm(state = {
    data: {
        media: '',
        title: ''
    },
}, action) {
    switch (action.type) {
        // case FILL_FORM:
        //     return { ...state, data: action.formData }
        default:
            return state;
    }
}

export default messageForm 
