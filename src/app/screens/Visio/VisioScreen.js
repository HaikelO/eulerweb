import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newMessage, fetchMessages } from './../../actions/Actions';

import './VisioScreenStyle.css';
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
  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>VisioScreen</h1>
        <Call/>
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

const mapDispatchToProps = { newMessage, fetchMessages }

export default connect(mapStateToProps, mapDispatchToProps)(VisioScreen);
