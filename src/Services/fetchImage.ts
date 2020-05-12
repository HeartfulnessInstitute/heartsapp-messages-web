import { client } from '../config/contentfulManagementApi';
import {get} from 'lodash';


export const fetchImageById = (id) => {
    return new Promise((resolve, reject) => {
        client.getSpace('0il7a0jwfqsh')
        .then((space) => {
            console.log(space.getEnvironment('master').then(env => {
                env.getAsset(id).then((res) => {
                    resolve('https:' + get(res, 'fields.file.en-US.url'))
                })
            })) }).catch((e) => {
                reject(e)
            })
    })
}
