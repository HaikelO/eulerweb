import React, { Component } from 'react'
import Peer from 'peerjs'
import {Chat} from './../Chat/Chat'
import Player from '../Player/Player'
import Modal from '../../components/Modal/Modal';

export class Call extends Component {
  constructor(props) {
    super(props)
    this.state = {
      remoteStream: null,
      localStream: null,
      id: null,
      call: null,
      session: null,
      showModal: false,
    }
    this.peer = new Peer(this.props.id, {
      host: 'projecteuler.herokuapp.com',
      path: '/api',
      port: '',
      ssl: true,
      debug: 3,
    });
  }

  componentDidMount() {
    
    this.getPermissions().then((stream) => {
      const self = this
      this.setState({ hasMedia: true , localStream: stream});      
      this.userStream = stream;
      this.peer.on('call', function (call) {
        
        // Answer the call, providing our mediaStream
               
        call.on('stream', (remoteStream) => {
          self.setState({remoteStream});
        });
        self.setState({
          showModal: true,
          action: ()=>{
            call.answer(stream)
            call.on('data',()=>{
              call.send('tesst')
            })
            self.setState({
              showModal: false,
              session: true,
            });
          },
        });         
      });
    });
  }

  callPeer = () => {
    const self = this
    const call = this.peer.call(this.state.id, this.userStream)
    this.setState({call})
    call.on('stream', function (remoteStream) {
      // Show stream in some <video> element. 
      self.setState({remoteStream , session: 'CONNECTING'})
    })
    call.on('data',(data)=>{
      console.log('data', data)
      call.send('REPLY')
    })
  }

  getPermissions = () => {
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

  renderModal = (showModal) => (
    <Modal modalIsOpen={showModal}>
      <div>Salut</div>
      <button onClick={this.state.action}>
        Answer
      </button>
    </Modal>
  )

  
  render() {
    const {localStream, remoteStream, call, session, showModal} = this.state
    const {id, messages} = this.props
    return (
      <div>
        {showModal ?
          (
            this.renderModal(showModal)
          ) : null}
        <div>
          <label>Id:</label><input type="number" onChange={(text) => { this.setState({ id: text.target.value }) }} />
          <button onClick={() => { this.callPeer() }}>Call</button>
        </div>
        <div style={{ width: '100%', display: 'flex'}}>
          <div style={{ width: '50%' }}>
            <h2 style={{ textAlign: 'center' }}>WEBCAM : {id}</h2>
            {localStream? <Player stream={localStream} /> : null}
          </div>
          <div style={{ width: '50%' }}>
            <h2 style={{ textAlign: 'center' }}>STREAM</h2>
            {remoteStream? <Player stream={remoteStream} /> : null}
          </div>
        </div>
        {session ? <Chat messages={messages} call={call}/> : null}
      </div>
    );
  }
}

export default Call
