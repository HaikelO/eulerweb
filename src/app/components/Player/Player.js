import React, { Component } from 'react'

export class Player extends Component {
  constructor(props) {
    super(props)
    this.video = React.createRef();
  }
  componentDidMount() {
    this.play(this.props.stream)
  }

  play = (stream) => {
    try {
      this.video.current.srcObject = URL.createObjectURL(stream);
    } catch (e) {
      this.video.current.src = URL.createObjectURL(stream);
    }
  }

  render() {
    const {stream} = this.props
    if(stream) {
      return (
        <video ref={this.video} autoPlay muted style={{ height: '400px', width: '400px', backgroundColor: 'black' }}></video>
      )
    }
    return null
  }
}

export default Player
