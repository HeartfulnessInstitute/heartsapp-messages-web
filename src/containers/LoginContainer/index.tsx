import * as React from 'react';
import { Card } from "antd";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import { 
  APP_CLIENT_ID,
  REDIRECT_URL
} from '../../Utils/constants';

import Header from '../../Layout/Header';

interface LoginProps {
  authorized: boolean;
}

const Login : React.FC<LoginProps> = (props) => {
  if(props.authorized) {
    return(
      <Redirect to="/dashboard" />
    )
  }
  const contentfulLink = `https://be.contentful.com/oauth/authorize?response_type=token&client_id=${APP_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=content_management_manage`;
  return(
    <React.Fragment>
      <Header />
      <div style={{'display': 'flex', alignItems: 'center', justifyContent: 'center', 'height': 'calc(100vh - 64px)'}}>
        <Card>
          <a href={contentfulLink}> Login with contentful</a>
        </Card>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
      authorized: state.authStore.authorized,
  };
};

export default connect(mapStateToProps)(Login);

