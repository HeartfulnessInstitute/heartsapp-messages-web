import * as React from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as qs from "query-string";

import LoginContainer from '../LoginContainer';
import Dashboard from '../../Layout/Dashboard';
import PageNotFound from '../../components/PageNotFound';
import PrivateRoute from '../PrivateRoute';
import Home from '../Home';
import { SIGN_IN } from '../../actions/auth';
import { AppStorage } from '../../AppStore';

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
        props.signIn()
     }
    
    return(
        <Switch>
            <Route path="/login" exact={true} component={LoginContainer} />
            <PrivateRoute path={"/dashboard"} exact={true} component={Dashboard} /> 
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
