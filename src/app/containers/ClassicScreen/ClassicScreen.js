import React, { Component } from 'react'

export default class ClassicScreen extends Component {  
  render() {
    const { children, title } = this.props
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>{title}</h1>
        {children}
      </div>
    );
  }
}
