import React, { Component } from 'react';
import { connect } from 'react-redux';

import './VisioScreenStyle.css';
import Call from '../../components/Call/Call';
import ClassicScreen from '../../containers/ClassicScreen/ClassicScreen'

class VisioScreen extends Component {
  renderCall = () => (
    <Call/>
  )
  
  render() {
    return (
      <ClassicScreen title={'VisioScreen'}>
        {this.renderCall()}
      </ClassicScreen>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(VisioScreen);
