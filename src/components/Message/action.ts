
export const FILL_FORM = "FILL_FORM";
const addData = (formData) => dispatch => {
    dispatch({
        type: FILL_FORM,
        Data: 'addMessage',
        value: formData
    })
}