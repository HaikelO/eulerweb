import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <Redirect to={{ pathname: "/login" }} />;      
    }
    
    return (
      <div>
        HomeScreen
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isAuthenticated: state.account.isAuthenticated,
  }
}
export default connect(mapStateToProps)(HomeScreen)
