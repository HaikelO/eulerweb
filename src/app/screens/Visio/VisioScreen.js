import React, { Component } from 'react';
import { connect } from 'react-redux';
import Peer from 'peerjs';
import Modal from '../../components/Modal/Modal';

import './VisioScreenStyle.css';

class VisioScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      hasMedia: false,
      id: null,
    };
    this.user = window.user;
    this.peer = new Peer(this.props.id, {
      host: 'projecteuler.herokuapp.com',
      path: '/api',
      port: '',
      ssl: true,
      debug: 3,
    });
    this.userStream = null;
    this.publisher = React.createRef();
    this.subscriber = React.createRef();
    this.playStreamSubscriber = this.playStreamSubscriber.bind(this);
    this.callPeer = this.callPeer.bind(this);
  }

  componentDidMount() {
    const self = this;
    this.getPermissions().then((stream) => {
      this.setState({ hasMedia: true });      
      this.userStream = stream;
      this.playPublisher(stream);
      this.peer.on('call', function (call) {
        // Answer the call, providing our mediaStream
        self.setState({
          showModal: true,
          action: ()=>{
            call.answer(stream);
            self.setState({
              showModal: false,
            });
          },
        });        
        call.on('stream', (remoteStream) => {
          self.playStreamSubscriber(remoteStream);
        });        
      });
    });

  }

  callPeer() {
    const self = this;
    const call = this.peer.call(this.state.id, this.userStream);
    call.on('stream', function (remoteStream) {
      // Show stream in some <video> element. 
      self.playStreamSubscriber(remoteStream); 
    });
  }

  playPublisher(stream) {
    try {
      this.publisher.current.srcObject = stream;
    } catch (e) {
      this.publisher.current.src = stream;
    }
  }

  playStreamSubscriber(stream) {
    try {
      this.subscriber.current.srcObject = URL.createObjectURL(stream);
    } catch (e) {
      this.subscriber.current.src = URL.createObjectURL(stream);
    }
  }

  getPermissions() {
    return new Promise((res, rej) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          res(stream);
        })
        .catch(err => {
          console.log(`getPermissions error ${err}`);
        });
    })
  }

  render() {
    const {showModal} = this.state; 
    return (
      <div>
        {showModal? 
        (
          <Modal modalIsOpen={showModal}>
            <div>Salut</div>
            <button onClick={this.state.action}>
              Answer
            </button>
          </Modal>
        ) : null}
        <h1 style={{textAlign: 'center'}}>VisioScreen</h1>
        <div>
          <label>Id:</label><input type="number" onChange={(text) => { this.setState({ id: text.target.value }) }} />
          <button onClick={() => { this.callPeer() }}>Call</button>
        </div>
        <div style={{ width: '100%', display: 'flex'}}>
          <div style={{ width: '50%' }}>
            <h2 style={{ textAlign: 'center' }}>WEBCAM : {this.props.id}</h2>
            <video className='publisher' ref={this.publisher} autoPlay muted style={{ height: '400px', width: '400px', backgroundColor: 'black' }}></video>
          </div>
          <div style={{ width: '50%' }}>
            <h2 style={{ textAlign: 'center' }}>STREAM</h2>
            <video className='subscriber' ref={this.subscriber} autoPlay style={{ height: '400px', width: '400px', backgroundColor: 'black' }}></video>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    id: state.account.id,
  }
}
export default connect(mapStateToProps)(VisioScreen);
