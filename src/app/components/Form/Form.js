import React, { Component } from 'react';

// Styles
import './FormStyle.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit();    
  }

  render() {
    return (
      <div className='container'>
        <form className='form' onSubmit={this.handleSubmit}>
          {this.props.children}          
          <input type="submit" className='buttonValider' value="Valider" />
        </form>
      </div>
    );
  }
}

export default Form;
