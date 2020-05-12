import {createClient} from 'contentful-management';
import { AppStorage } from '../../AppStore';

const appStorage = new AppStorage()
let client
const configureContentfulManagement = () => {
  const accessToken = appStorage.getFromLocalStorage('accessToken');
  client = createClient({
    // This is the access token for this space. Normally you get the token in the Contentful web app
    accessToken
  })
}

export  { configureContentfulManagement, client }