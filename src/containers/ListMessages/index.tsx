import * as React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import Dashboard from '../../Layout/Dashboard';
import { getMessageList } from './actions';
import Message from '../../components/Message';
 
import './style.scss';

interface ListMessagesProps {
    getMessageList: () => void;
    messages: [],
    showLoader: boolean
}

interface ListMessagesState {
    messages: [],
    showLoader: boolean
}

class ListMessages extends React.Component<ListMessagesProps, ListMessagesState> {

    constructor(props) {
        super(props)
        this.state = {
            messages : [],
            showLoader: false
        }
    }
    componentDidMount() {
        this.props.getMessageList()
    }

    componentDidUpdate(prevProps: ListMessagesProps) {
        if (prevProps.messages.length !== this.props.messages.length) {
            this.setState({
                messages: this.props.messages
            })
        }
       if(prevProps.showLoader !== this.props.showLoader) {
           this.setState({
            showLoader: this.props.showLoader
           })
       }
       
    }

    render() {
        const { messages } = this.state;
        return(
            <Dashboard>
              <div className="message-list-wrapper">
                  {
                      this.state.showLoader ? <div className="center"><Spin size="large" /> </div>: <div>
                      {
                        messages.map((message, index) => (
                            <Message  key={index} message={message}/>
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
        showLoader: state.loaderStore.loaders.listMessages
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getMessageList : () => dispatch(getMessageList())
    }
}
export default connect(mapDispatchToState, mapDispatchToProps)(ListMessages);
