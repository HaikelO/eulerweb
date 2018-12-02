import React, { Component } from 'react'
import { connect } from 'react-redux'
import { newMessage, fetchMessages } from './../../actions/Actions'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    const { call, answer } = this.props
    this.fetchMessages()
    if (answer) {
      call.on('data', ({ message }) => {
        this.newMessage(message)
      })
    }
  }


  newMessage = (message) => {
    this.props.newMessage(message)
  }

  fetchMessages = () => {
    this.props.fetchMessages()
  }

  renderMessage = ({ message, id }, index) => {
    const myId = this.props.id
    if (message && index) {
      return (
        <div key={`message${index.toString()}`} style={{ width: 200, borderRadius: 4 }}>
        <p style={id === myId ? {textAlign:'right'}:null}>
          <span style={id === myId ? { width: 'fit-content', right: 0, backgroundColor: 'blue', color: 'white' } : { width: 'fit-content', left: 0, backgroundColor: 'grey', color: 'white' }}>{message}</span>
        </p>
        </div >
      );
    }
  };

  renderMessages = messages => {
    if (messages && messages.length > 0) {
      return messages.map((message, index) => this.renderMessage(message, index));
    }
  }

  sendMessage = () => {
    const { message } = this.state
    const { id, conn } = this.props
    this.props.newMessage({ message, id })
    conn.send({ message, id })
  }

  handleChange = message => {
    this.setState({ message: message.target.value })
  }

  render() {
    const { messages } = this.props
    return (
      <div>
        <label>Chat</label>
        <div>
          {this.renderMessages(messages)}
        </div>
        <textarea name="comment" form="usrform" onChange={this.handleChange}>Enter text here...</textarea>
        <button onClick={this.sendMessage}>Envoyer</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  id: state.account.id,
  port: state.config.port,
  messages: state.chat.messages,
})

const mapDispatchToProps = { newMessage, fetchMessages }

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
