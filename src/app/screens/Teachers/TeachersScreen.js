import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchTeachers } from '../../actions/Actions';

class TeachersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.fetchTeachers();
  }

  renderTeacher(teacher) {
    if (teacher) {
      return (
        <div>{teacher.name}</div>
      );
    }
    return null;
  }

  render() {
    const { teachers } = this.props;
    return (
      <div>
        {teachers.map((teacher) => this.renderTeacher(teacher))}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    teachers: state.teachers.list,
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchTeachers }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TeachersScreen);
