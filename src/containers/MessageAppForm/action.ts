import { client } from '../../config/contentfulManagementApi';

export const SET_MESSAGES_LIST_LOADER = "SET_MESSAGES_LIST_LOADER";


export const addOrUpdateMessage = (formData, publish) => dispatch => {
    const loaderType = publish ? "publish" : "draft";
    dispatch(setLoader(loaderType))
    return client.getSpace('0il7a0jwfqsh')
        .then((space) => {
            let data = {
                "fields": {
                    "title": {
                        "en-US": formData.title
                    },
                    "videoUrl": {
                    },
                    "messageText": {
                        "en-US": formData.messageText
                    },
                    "image_url": {
                    }
                }
            }

            space.getEnvironment('master').then(env => {
                if (formData.image) {
                    let filedata = {
                        fields: {
                            title: {
                                'en-US': 'title'
                            },
                            file: {}
                        }
                    }

                    const reader = new FileReader();
                    reader.readAsArrayBuffer(formData.image)
                    reader.addEventListener("load", function () {
                        env.createUpload({ 'file': reader.result }).then(res => {
                            filedata.fields.file['en-US'] = {
                                fileName: 'random-image',
                                contentType: 'image/jpeg',
                                uploadFrom: {
                                    sys: {
                                        type: 'Link',
                                        linkType: 'Upload',
                                        id: res.sys.id
                                    }
                                }
                            }

                            env.createAsset(filedata).then((asset) =>
                                asset.processForAllLocales()
                            ).then((res) =>
                                res.publish()
                            ).then((response) => {
                                data.fields.image_url['en-US'] = {
                                    'sys': {
                                        'id': response.sys.id,
                                        'linkType': "Asset",
                                        'type': "Link"
                                    }
                                }
                                env.createEntry('message', data).then((entry) => {
                                    if (publish) {
                                        res.publish()
                                        
                                    }
                                    dispatch(setLoader(""))
                                })

                            })

                        })
                    }, false);

                } else {
                    data.fields.videoUrl = {
                        'en-US': formData.url
                    }

                    //formdData id exists env.updateEntry()
                    env.createEntry('message', data).then((res) => {
                        if (publish) {
                            res.publish()
                        }
                        dispatch(setLoader(""))
                    })
                }

            })

            // Now that we have a space, we can get entries from that space
        }).catch((e) => {
            dispatch(setLoader(""))
        }
        )

}

const setLoader = (status) => dispatch => {
    dispatch({
        type: SET_MESSAGES_LIST_LOADER,
        loaderType: 'addMessage',
        loading: status
    })
}