import React, { Component } from 'react'

export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      users: [],
    };
  }
  renderMessage = (message) => {
    return (
      <div>
        {message.value}
      </div> 
    );
  };

  renderMessages = (messages) => {
    if(messages && messages.length > 0) {
      return messages.map(this.renderMessage());
    }
     
  }
  
  render() {
    return (
      <div>
          <label>Chat</label>
          <div>
            {this.renderMessages(this.state.messages)}
          </div>
          <textarea name="comment" form="usrform">Enter text here...</textarea>
          <button>Envoyer</button>
      </div>
    )
  }
}

export default Chat
