import * as React from 'react';
import {  Layout  } from 'antd';
import { Link } from 'react-router-dom';

import './style.scss';

const { Header, Content } = Layout;

const Dashboard = (props) => {
    return(
        <Layout>
        <Header className="header">
          <div className="logo" />
          <Link to='/dashboard'> Dashboard</Link>
        </Header>
          <Layout className={'dashboard-layout-wrapper'} style={{ padding: '0' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 0,
                margin: 0,
              }}
            >
              {props.children}
            </Content>
        </Layout>
      </Layout>
    )
}

export default Dashboard;
