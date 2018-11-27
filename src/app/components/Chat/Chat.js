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
    call.on('data', (message)=>{
      console.log('message', message)
      call.send('Salut')
    })
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
  
  render() {
    const {messages} = this.props;
    return (
      <div>
          <label>Chat</label>
          <div>
            {this.renderMessages(messages)}
          </div>
          <textarea name="comment" form="usrform">Enter text here...</textarea>
          <button>Envoyer</button>
      </div>
    )
  }
}

export default Chat
