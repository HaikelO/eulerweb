import React, { Component } from 'react'

export class Chat extends Component {
  render() {
    return (
      <div>
          <label>Chat</label>
          <div>
            Say : Hello !
          </div>
          <textarea name="comment" form="usrform">Enter text here...</textarea>
          
      </div>
    )
  }
}

export default Chat
