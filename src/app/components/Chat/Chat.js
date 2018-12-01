import React, { Component } from 'react'

export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    const {call} = this.props
    console.log('call', call)
    if(this.props.answer){
      call.on('data', (message)=>{
        console.log('message', message)
        call.send('Salut')
      })
    }
  }

  renderMessage = (message, index) => {
    if(message && message.message && index) {
      return (
        <div key={`message${index.toString()}`}>
          {message.message}
        </div> 
      );
    }
  };

  renderMessages = (messages) => {
    console.log('renderMessages', messages);
    if(messages && messages.length > 0) {
      return messages.map((message, index) => this.renderMessage(message, index));
    }
  }

  sendMessage = (message) => {
    const {conn} = this.props
    conn.send(message)
  }

  handleChange = (message) => {
    console.log('message', message.target.value)
    this.setState({message: message.target.value})
  }
  
  render() {
    const {messages} = this.props;
    const {message} = this.state;
    return (
      <div>
          <label>Chat</label>
          <div>
            {this.renderMessages(messages)}
          </div>
          <textarea name="comment" form="usrform" onChange={this.handleChange}>Enter text here...</textarea>
          <button onClick={this.sendMessage(message)}>Envoyer</button>
      </div>
    )
  }
}

export default Chat
