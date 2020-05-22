import * as React from 'react';
import { connect } from 'react-redux';
import { Spin, notification } from 'antd';

import Dashboard from '../../Layout/Dashboard';
import { getMessageList, onDeleteMessage } from './actions';
import Message from '../../components/Message';
 
import './style.scss';

interface ListMessagesProps {
    getMessageList: () => void;
    messages: [],
    showLoader: boolean;
    onDeleteMessage: (id) => Promise<any>;
    showDeleteMessageLoader: {[id: string]: boolean}
}

interface ListMessagesState {
    messages: [],
    showLoader: boolean
}

class ListMessages extends React.Component<ListMessagesProps, ListMessagesState> {
    componentDidMount() {
        this.props.getMessageList()
    }

    onDeleteMessage = (id) => {
        this.props.onDeleteMessage(id).then(() =>{
            notification.success({
                message: 'Message deleted successfully!',
              });
             setTimeout(() => this.props.getMessageList(), 2000) 
        }).catch(() => {
            notification.error({
                message: 'Something went wrong please try again.',
              });
        })
    }

    render() {
        const { messages, showLoader, showDeleteMessageLoader } = this.props;
        return(
            <Dashboard>
              <div className="message-list-wrapper">
                  {
                      showLoader ? <div className="center"><Spin size="large" /> </div>: <div>
                      {
                        messages && messages.map((message, index) => (
                            <Message  key={index} message={message} onDeleteMessage={this.onDeleteMessage} showDeleteMessageLoader={showDeleteMessageLoader} />
                        ))
                      }
                      </div>
                  }
              </div>
            </Dashboard>
        )
    }
    
}

const mapDispatchToState = state => {
    return {
        messages: state.messageStore.messages,
        showLoader: state.loaderStore.loaders.listMessages,
        showDeleteMessageLoader: state.loaderStore.loaders.deleteMessage
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getMessageList : () => dispatch(getMessageList()),
        onDeleteMessage: (id) => dispatch(onDeleteMessage(id))
    }
}
export default connect(mapDispatchToState, mapDispatchToProps)(ListMessages);

