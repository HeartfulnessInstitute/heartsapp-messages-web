import * as React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import LoginContainer from '../LoginContainer';
import Dashboard from '../../Layout/Dashboard';
import PageNotFound from '../../components/PageNotFound';

const Routes = () => {
    return(
        <Router>
            <Switch>
                <Route path="/login" exact={true}>
                    <LoginContainer />
                </Route>
                <Route path="/dashboard" exact={true}>
                    <Dashboard />
                </Route>
                <Route path="/*">
                    <PageNotFound />
                </Route>
            </Switch>
        </Router>
        
    )
}

export default Routes;
