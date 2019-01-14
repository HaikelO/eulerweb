import React, { Component } from 'react'
import { connect } from 'react-redux'
import { newMessage, fetchMessages } from './../../actions/Actions'
import Button from '../Button/Button'

class Chat extends Component {
  constructor(props){
    super(props)
    this.state = {
      message : 'Enter text here...'
    }
  }

  componentDidMount() {
    const { call, answer } = this.props
    this.fetchMessages()
    return (answer ? call.on('data', ({ message }) => this.newMessage(message)) : null)    
  }

  newMessage = message => this.props.newMessage(message)
  fetchMessages = () => this.props.fetchMessages()

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

  renderEnvoyer = () => <Button onClick={this.sendMessage} title={'Envoyer'}/>
  renderMessages = messages => (messages && messages.length > 0 ? messages.map((message, index) => this.renderMessage(message, index)) : null)
  renderTextArea = () => <textarea name="comment" form="usrform" onFocus={this.onFocus} onChange={this.onChange} value={this.state.message}/>
  sendMessage = () => {
    const { message } = this.state
    const { id, conn } = this.props
    this.props.newMessage({ message, id })
    conn.send({ message, id })
    this.setState({message: ''})
  }

  onChange = message => this.setState({ message: message.target.value })
  onFocus = e => this.setState({ message: '' })

  render() {
    const { messages } = this.props
    return (
      <div>
        <label>Chat</label>        
        {this.renderMessages(messages)}        
        {this.renderTextArea()}
        {this.renderEnvoyer()}        
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
