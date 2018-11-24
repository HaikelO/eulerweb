import React, { Component } from 'react';
/* import openSocket from 'socket.io-client'; */
import Peer from 'peerjs';
import './VisioScreen.css';




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
    this.userStream = null;
    /* this.socket = openSocket('http://localhost:8000'); */
    this.publisher = React.createRef();
    this.subscriber = React.createRef();
    /* this.subscriber = React.createRef(); */
    this.playStreamSubscriber = this.playStreamSubscriber.bind(this);
    this.peer1 = new Peer('toto', {
      host: '88.182.118.218',
      path: '/api',
      port: '9000',
      debug: 3,
    });
    this.peer2 = new Peer('tata', {
      host: '88.182.118.218',
      path: '/api',
      port: '9000',
      debug: 3,
    });
  }



  componentDidMount() {
    const self = this;
    this.getPermissions().then((stream) => {
      this.setState({ hasMedia: true });
      /* this.socket.emit('stream', stream); */
      try {
        this.publisher.current.srcObject = stream;


      } catch (e) {
        this.publisher.current.src = URL.createObjectURL(stream);
      }
      const call = this.peer1.call('tata', stream);
      call.on('stream', function (remoteStream) {
        // Show stream in some <video> element.
        console.log('remoteStream', remoteStream);
      });
      this.peer2.on('call', function (call2) {
        // Answer the call, providing our mediaStream
        call2.answer();
        call2.on('stream', (remoteStream) => {
          
          console.log('subscriber', this.subscriber);
          try {
            self.subscriber.current.srcObject = URL.createObjectURL(remoteStream);

          } catch (e) {
            self.subscriber.current.src = URL.createObjectURL(remoteStream);
          }
          console.log('remoteStream2', remoteStream.active);
        });
      });

      this.sendSignal();
      this.sendStream(stream);
      /* this.getStream(); */
    });
  }

  sendSignal() {
    console.log('test');
    /* peer1.on('connection', function (data) {
        console.log('Hey connection !'); */
    // when peer1 has signaling data, give it to peer2 somehow
    /* peer2.signal(data); */
    /* });
    peer1.on('data', function (data) {
        console.log('Hey data!');
        peer1.send('Hey mama !'); */
    // when peer1 has signaling data, give it to peer2 somehow
    /* peer2.signal(data); */
    /* }); */
    /* peer2.on('signal', function (data) {
        // when peer2 has signaling data, give it to peer1 somehow
        peer1.signal(data);
    }); */
  }

  /* getStream() {
      peer2.on('data', function (data) {
          // got a data channel message
          console.log('Subriber On');
          try {
              this.subscriber.srcObject = data;
  
          } catch (e) {
              this.subscriber.src = URL.createObjectURL(data);
          }
          console.log('got a message from peer1: ' + data);
      });
  } */

  sendStream(stream) {
    this.peer1.on('connect', function () {
      // wait for 'connect' event before using the data channel
      this.peer1.send(stream);
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

  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>VisioScreen</h1>
        <div>
          <label>Id:</label><input type="text" onChange={(text)=>{ this.setState({id: text})}}/>
        </div>
        <div style={{width:'100%', display:'flex'}}>
          <div style={{width:'50%'}}>
            <h2 style={{textAlign:'center'}}>WEBCAM</h2>
            <video className='publisher' ref={this.publisher} autoPlay muted style={{ height: '400px', width: '400px', backgroundColor: 'black' }}></video>
          </div>
          <div style={{width:'50%'}}>
            <h2 style={{textAlign:'center'}}>STREAM</h2>
            <video className='subscriber' ref={this.subscriber} autoPlay style={{ height: '400px', width: '400px', backgroundColor: 'black' }}></video>
          </div>
        </div>
      </div>
    );
  }
}

export default VisioScreen;
