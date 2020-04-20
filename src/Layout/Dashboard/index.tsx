import * as React from 'react';
import {  Layout, Menu  } from 'antd';

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
    return(
        <Layout>
        <Header className="header">
          <div className="logo" />
        </Header>
        <Layout>
          <Sider style={{background: 'black'}} width={200} className="site-layout-background">
            <Menu style={{color: 'white'}}>
                Menu1
            </Menu>
          </Sider>
          <Layout style={{ padding: '0' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {/* {props.component} */}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
}

export default Dashboard;
