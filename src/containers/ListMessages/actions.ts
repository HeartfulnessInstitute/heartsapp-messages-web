import { client } from '../../config/contentfulManagementApi';

export const GET_MESSAGES_LIST = "GET_MESSAGES_LIST";
export const SET_MESSAGES_LIST_LOADER = "SET_MESSAGES_LIST_LOADER";


export const getMessageList = () => dispatch => {
    dispatch(setLoader(true, 'listMessages'))
    client.getSpace('0il7a0jwfqsh')
    .then((space) => {
        space.getEnvironment('master').then(env => {
            env.getEntries()
            .then((entries) => {
                dispatch({
                    type: GET_MESSAGES_LIST,
                    messages: entries.items
                })
                dispatch(setLoader(false, 'listMessages'))
            })})
        }).catch((e) => {
        dispatch(setLoader(false, 'listMessages'))
      })
   
}

export const onDeleteMessage = (id) => dispatch => {
    dispatch(setLoader({[id]: true}, 'deleteMessage'))
    return client.getSpace('0il7a0jwfqsh')
    .then((space) => {
        space.getEnvironment('master').then(env => {
            env.getEntry(id)
            .then((entry) => {
               entry.delete()
                dispatch(setLoader({[id]: false}, 'deleteMessage'))
            })})
        }).catch((e) => {
        dispatch(setLoader({[id]: false}, 'deleteMessage'))
        throw new Error(e)
      })
}

const setLoader = (status, type) => dispatch => {
    dispatch({
        type: SET_MESSAGES_LIST_LOADER,
        loaderType: type,
        loading: status
    })
}