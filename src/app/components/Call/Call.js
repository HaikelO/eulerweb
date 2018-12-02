import React, { Component } from 'react'
import { connect } from 'react-redux'
import Peer from 'peerjs'
import Chat from './../Chat/Chat'
import Player from '../Player/Player'
import Modal from '../../components/Modal/Modal'
import { newMessage, fetchMessages } from './../../actions/Actions'

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
      answer: false,
      conn: null,
    }
    this.peer = new Peer(this.props.id, {
      host: 'projecteuler.herokuapp.com',
      path: '/api',
      port: '',
      ssl: true,
      debug: 3,
    });
    /* this.peer = new Peer(this.props.id, {
      host: 'localhost',
      path: '/api',
      port: '5000',
      ssl: true,
      debug: 3,
    }); */
  }

  componentDidMount() {
    this.getPermissions().then(stream => {
      const self = this
      this.setState({ hasMedia: true, localStream: stream })
      this.userStream = stream
      this.peer.on('open', () => {
        console.log('peer.id', this.peer.id)
      });
      this.peer.on('connection', (conn) => {
        this.setState({ conn })
        conn.on('data', (message) => {
          console.log('data', message)
          this.newMessage(message)
        });
      })
      this.peer.on('call', (call) => {

        // Answer the call, providing our mediaStream

        call.on('stream', (remoteStream) => {
          self.setState({ remoteStream })
        });
        self.setState({
          showModal: true,
          call,
          action: () => {
            call.answer(stream)
            call.open = true
            call.on('data', () => {
              call.send('tesst')
            })
            self.setState({
              showModal: false,
              session: true,
              answer: true,
            });
          },
        });
      });
    });
  }



  newMessage = (message) => {    
    this.props.newMessage(message)
  }

  callPeer = () => {
    const self = this
    const conn = this.peer.connect(this.state.id)
    const call = this.peer.call(this.state.id, this.userStream)
    this.setState({ call, conn })
    call.on('stream', function (remoteStream) {
      // Show stream in some <video> element. 
      self.setState({ remoteStream, session: 'CONNECTING' })
    })
    conn.on('data', (message) => {
      console.log('data', message)
      this.newMessage(message)
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

  closeCall = () => {
    const { call } = this.state
    call.close()
  }

  renderChat = () => {
    const { call, answer, conn } = this.state
    const { messages } = this.props
    return <Chat messages={messages} call={call} answer={answer} conn={conn} />
  }

  render() {
    const { localStream, remoteStream, session, showModal } = this.state
    const { id } = this.props
    return (
      <div>
        {showModal ?
          (
            this.renderModal(showModal)
          ) : null}
        <div>
          <label>Id:</label><input type="number" onChange={(text) => { this.setState({ id: text.target.value }) }} />
          <button onClick={this.callPeer}>Call</button>
          {session ? <button onClick={this.closeCall}>End</button> : null}
        </div>
        <div style={{ width: '100%', display: 'flex' }}>
          <div style={{ width: '50%' }}>
            <h2 style={{ textAlign: 'center' }}>WEBCAM : {id}</h2>
            {localStream ? <Player stream={localStream} /> : null}
          </div>
          <div style={{ width: '50%' }}>
            <h2 style={{ textAlign: 'center' }}>STREAM</h2>
            {remoteStream ? <Player stream={remoteStream} /> : null}
          </div>
        </div>
        {session ? this.renderChat() : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  id: state.account.id,
  port: state.config.port,
  messages: state.chat.messages,
})


const mapDispatchToProps = { newMessage, fetchMessages }

export default connect(mapStateToProps, mapDispatchToProps)(Call);
