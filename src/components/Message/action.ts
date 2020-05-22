
export const FILL_FORM = "FILL_FORM";

export const addData = (formData) => dispatch => {
    dispatch({
        type: FILL_FORM,
        value: formData
    })
}