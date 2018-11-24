import React, { Component } from 'react';
import { connect } from 'react-redux';
/* import openSocket from 'socket.io-client'; */
import Peer from 'peerjs';
import './VisioScreen.css';
import { cpus } from 'os';




/* var conn1 = peer1.connect('tata') */
/* var conn2 = peer2.connect('toto') */
class VisioScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMedia: false,
      otherUserId: null,
      streamMedia: null,
      id: null,
    };
    this.user = window.user;
    this.peer = new Peer(this.props.id, {
      host: '88.182.118.218',
      path: '/api',
      port: '9000',
      debug: 3,
    });
    this.userStream = null;
    /* this.socket = openSocket('http://localhost:8000'); */
    this.publisher = React.createRef();
    this.subscriber = React.createRef();
    /* this.subscriber = React.createRef(); */
    this.playStreamSubscriber = this.playStreamSubscriber.bind(this);
    this.callPeer = this.callPeer.bind(this);
    
    /* this.peer2 = new Peer(this.props.id+1, {
      host: '88.182.118.218',
      path: '/api',
      port: '9000',
      debug: 3,
    }); */
  }



  componentDidMount() {
    const self = this;
    this.getPermissions().then((stream) => {
      this.setState({ hasMedia: true });
      /* this.socket.emit('stream', stream); */
      this.userStream = stream;
      try {
        this.publisher.current.srcObject = stream;


      } catch (e) {
        this.publisher.current.src = URL.createObjectURL(stream);
      }

      this.peer.on('call', function (call) {
        // Answer the call, providing our mediaStream
        call.answer();
        call.on('stream', (remoteStream) => {

          console.log('subscriber', this.subscriber);
          try {
            self.subscriber.current.srcObject = URL.createObjectURL(remoteStream);

          } catch (e) {
            self.subscriber.current.src = URL.createObjectURL(remoteStream);
          }
          console.log('remoteStream2', remoteStream.active);
        });        
      });
    });

  }

  callPeer() {
    console.log('this.state.id', this.state.id);
    const self = this;
    const call = this.peer.call(this.state.id, this.userStream);
    call.on('stream', function (remoteStream) {
      // Show stream in some <video> element.        
      try {
        self.subscriber.current.srcObject = URL.createObjectURL(remoteStream);
      } catch (e) {
        self.subscriber.current.src = URL.createObjectURL(remoteStream);
      }
    });
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

  link() {

  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>VisioScreen</h1>
        <div>
          <label>Id:</label><input type="number" onChange={(text) => { this.setState({ id: text.target.value }) }} />
          <button onClick={() => { this.callPeer() }}>Link</button>
          <button onClick={() => { this.callPeer() }}>Answer</button>
        </div>
        <div style={{ width: '100%', display: 'flex' }}>
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
