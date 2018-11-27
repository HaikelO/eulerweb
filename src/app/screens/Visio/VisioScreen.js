import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newMessage, fetchMessages } from './../../actions/Actions';

import './VisioScreenStyle.css';
import { bindActionCreators } from 'redux';
import Call from '../../components/Call/Call';

class VisioScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      hasMedia: false,
      id: null,
    };
    this.user = window.user;
    this.userStream = null;
    this.publisher = React.createRef();
    this.subscriber = React.createRef();
  }

  componentDidMount() {
    this.props.fetchMessages();
  }

  render() {
    const { messages, id } = this.props;
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>VisioScreen</h1>
        <Call id={id} messages={messages} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    id: state.account.id,
    port: state.config.port,
    messages: state.chat.messages,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ newMessage, fetchMessages }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VisioScreen);
