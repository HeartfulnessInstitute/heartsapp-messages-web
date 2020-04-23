import * as React from 'react';
import { Card } from 'antd';

import Dashboard from '../../Layout/Dashboard';
import MessageAppForm from '../MessageAppForm';

import './style.scss';
const PostMessage = () => {
    return(
        <Dashboard>
          <div className="post-message-layout">
          <Card style={{width: '600px'}}>
          <MessageAppForm />
          </Card>
          </div>
        </Dashboard>
    )
}

export default PostMessage;
