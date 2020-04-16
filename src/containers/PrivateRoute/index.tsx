import React, { FunctionComponent } from 'react';
import { Route, Redirect, RouteComponentProps} from 'react-router-dom';
import { connect } from 'react-redux';


type PrivateRouteProps = { component: FunctionComponent } & RouteComponentProps;

const PrivateRoute : React.FC<PrivateRouteProps> = ({ authorized, children, ...rest }) => {
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
