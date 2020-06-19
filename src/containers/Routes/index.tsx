import React, {useEffect} from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as qs from "query-string";

import LoginContainer from '../LoginContainer';
import Console from '../../components/Console';
import PostMessage from '../PostMessage';
import ListMessages from '../ListMessages';
import PageNotFound from '../../components/PageNotFound';
import PrivateRoute from '../PrivateRoute';
import Home from '../Home';
import { SIGN_IN } from '../../actions/auth';
import { AppStorage } from '../../AppStore';
import { configureContentfulManagement } from '../../config/contentfulManagementApi'
const appStorage = new AppStorage()

const Routes = (props) => {
    const location = useLocation()
    const qsObj = qs.parse(location.hash);
     if(qsObj["access_token"]) {
        appStorage.setToLocalStorage('accessToken', qsObj["access_token"] as string)
        return(
            <Redirect to='/dashboard' />
        )
     }

     if(qsObj["access_token"] || !!(appStorage.getFromLocalStorage('accessToken'))) {
        props.signIn();
        configureContentfulManagement()
     }
    
    return(
        <Switch>
            <PrivateRoute path={"/dashboard"} exact={true} component={Console} />
            <PrivateRoute path={"/messages"} exact={true} component={ListMessages} />
            <PrivateRoute path='/post' exact={true} component={PostMessage} />
            <PrivateRoute path='/edit' exact={true} component={PostMessage} />
            <Route path="/login" exact={true} component={LoginContainer} />
            <Route path="/" exact={true} component={Home} />
            <Route path={"/*"} component={PageNotFound} />
        </Switch>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: () => dispatch({
            type: SIGN_IN
        })
    }
}

export default connect(null, mapDispatchToProps)(Routes);
