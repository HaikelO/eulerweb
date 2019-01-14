import React, { Component } from 'react'
import { connect } from 'react-redux'
import { from } from 'rxjs';
import Peer from 'peerjs'
import Chat from './../Chat/Chat'
import Player from '../Player/Player'
import Modal from '../../components/Modal/Modal'
import { newMessage, fetchMessages } from './../../actions/Actions'
import Button from '../Button/Button'

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
      video: true,
      audio: true,
    }
    this.peer = new Peer(this.props.id, {
      host: 'projecteuler.herokuapp.com',
      path: '/api',
      port: '',
      ssl: true,
      debug: 3,
    })
    /* this.peer = new Peer(this.props.id, {
      host: 'localhost',
      path: '/api',
      port: '5000',
      ssl: true,
      debug: 3,
    }); */
    this.observable = from(this.getPermissions())
    this.subscriber = {}
  }

  componentDidMount() {
    this.peer.on('open', () => console.log('peer.id', this.peer.id));
    this.peer.on('connection', conn => {
      this.setState({ conn })
      conn.on('data', message => this.newMessage(message));
    })
    this.subscriber = this.observable.subscribe(stream => {
      this.setState({ hasMedia: true, localStream: stream })
    })
    const self = this
    this.peer.on('call', (call) => {
      // Answer the call, providing our mediaStream
      call.on('stream', remoteStream => {
        self.setState({ remoteStream })
      });
      self.setState({
        showModal: true,
        call,
        action: () => self.answerCall(call),
      });
    });
  }

  answerCall = call => {
    call.answer(this.state.localStream)
    call.open = true
    this.setState({
      showModal: false,
      session: true,
      answer: true,
    });
  }

  manageVideo = () => { }

  playPublishVideo = () => {
    const { localStream } = this.state
    localStream.getTracks().forEach(track => track.kind === 'video' ? track.enabled  = true : null)
  }

  stopPublishVideo = () => {
    const { localStream } = this.state
    localStream.getTracks().forEach(track => track.kind === 'video' ? track.enabled  = false : null)
  }

  playPublishAudio = () => {
    const { localStream } = this.state
    localStream.getTracks().forEach(track => track.kind === 'audio' ? track.enabled  = true : null)
  }

  stopPublishAudio = () => {
    const { localStream } = this.state
    localStream.getTracks().forEach(track => track.kind === 'audio' ? track.enabled  = false : null)
  }

  renderEnd = () => (this.state.session ? this.renderButton(this.closeCall, 'End') : null)
  renderCall = () => this.renderButton(this.callPeer, 'Call')
  renderAnswer = () => this.renderButton(this.state.action, 'Answer')
  renderPlayPublishVideo = () => this.renderButton(this.playPublishVideo, 'Resume Video')
  renderStopPublishVideo = () => this.renderButton(this.stopPublishVideo, 'Pause Video')
  renderPlayPublishAudio = () => this.renderButton(this.playPublishAudio, 'Resume Audio')
  renderStopPublishAudio = () => this.renderButton(this.stopPublishAudio, 'Pause AUdio')
  renderManageVideo = () => this.renderButton(this.manageVideo, 'Video')
  renderButton = (onClick, title) => <Button onClick={onClick} title={title} />

  newMessage = message => this.props.newMessage(message)

  callPeer = () => {
    const self = this
    const conn = this.peer.connect(this.state.id)
    const call = this.peer.call(this.state.id, this.state.localStream)
    this.setState({ call, conn, session: true })
    call.on('stream', remoteStream => self.setState({ remoteStream }))
    conn.on('data', message => this.newMessage(message))
  }

  getPermissions = () => {
    const { video, audio } = this.state
    return new Promise((res, rej) => {
      navigator.mediaDevices.getUserMedia({ video, audio })
        .then(localStream => {
          res(localStream)
        })
        .catch(err => {
          console.log(`getPermissions error ${err}`)
          rej(err)
        });
    })
  }

  renderModal = () => {
    const { showModal } = this.state
    return (showModal ? <Modal modalIsOpen={showModal}>{this.renderAnswer()}</Modal> : null)
  }

  closeCall = () => {
    const { call } = this.state
    call.close()
  }

  renderChat = () => {
    const { call, answer, conn, session } = this.state
    const { messages } = this.props
    return (session ? <Chat messages={messages} call={call} answer={answer} conn={conn} /> : null)
  }

  render() {
    const { localStream, remoteStream } = this.state
    const { id } = this.props
    return (
      <div>
        {this.renderModal()}
        <div>
          <label>Id:</label><input type="number" onChange={(text) => { this.setState({ id: text.target.value }) }} />
          {this.renderCall()}
          {this.renderEnd()}
        </div>
        <div style={{ width: '100%', display: 'flex' }}>
          <div style={{ width: '50%' }}>
            <h2 style={{ textAlign: 'center' }}>WEBCAM : {id}</h2>
            {localStream ? (
              <div>
                <Player stream={localStream} />
                {this.renderManageVideo()}
                {this.renderStopPublishVideo()}
                {this.renderPlayPublishVideo()}
                {this.renderStopPublishAudio()}
                {this.renderPlayPublishAudio()}
              </div>
            ) : null}
          </div>
          <div style={{ width: '50%' }}>
            <h2 style={{ textAlign: 'center' }}>STREAM</h2>
            {remoteStream ? <Player stream={remoteStream} /> : null}
          </div>
        </div>
        {this.renderChat()}
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
