import { client } from '../../config/contentfulManagementApi';

export const GET_MESSAGES_LIST = "GET_MESSAGES_LIST";
export const SET_MESSAGES_LIST_LOADER = "SET_MESSAGES_LIST_LOADER";


export const getMessageList = () => dispatch => {
    dispatch(setLoader(true))
    client.getSpace('0il7a0jwfqsh')
    .then((space) => {
        console.log(space.getEnvironment('master').then(env => {
            env.getAsset('4KjNvNU0WHiL0kZAljRwFw').then((res) => {
                console.log('asset', res)
            })
        }))

       
      // Now that we have a space, we can get entries from that space
      space.getEntries()
      .then((entries) => {
          dispatch({
              type: GET_MESSAGES_LIST,
              messages: entries.items
          })
          dispatch(setLoader(false))
      })}).catch((e) => {
        dispatch(setLoader(false))
      })
   
}

const setLoader = (status) => dispatch => {
    dispatch({
        type: SET_MESSAGES_LIST_LOADER,
        loaderType: 'listMessages',
        loading: status
    })
}