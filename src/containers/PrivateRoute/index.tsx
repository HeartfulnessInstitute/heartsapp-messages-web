import * as React from 'react';
import { Route, Redirect, RouteComponentProps} from 'react-router-dom';
import { connect } from 'react-redux';

interface PrivateRouteProps {
    authorized: boolean;
}

const PrivateRoute = ({ authorized, children, ...rest }) => {
    return(<Route
        {...rest}
        render={({ location }) =>
        authorized ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
      
  }

  const mapStateToProps = state => {
    return {
        authorized: state.authStore.authorized,
    };
};

  export default connect(mapStateToProps)(PrivateRoute);
