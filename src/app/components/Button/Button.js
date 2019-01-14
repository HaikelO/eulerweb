import React, { Component } from 'react';

class Button extends Component {

  render() {
    const { title, onClick } = this.props
    return <button onClick={onClick}>{title}</button>
  }
}

export default Button;
