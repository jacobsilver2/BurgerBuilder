//dependencides
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
//actions
import * as actions from '../../../store/actions/index'

//this component will trigger an instant redirect upon loading

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();

  }
  render() {
    return (
      <Redirect to="/"/>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
}

export default connect(null, mapDispatchToProps)(Logout);