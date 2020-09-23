import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';

import { checkLogin } from '../actions/userActions';

class Index extends Component {
  componentDidMount() {
    this.props.checkLogin();
  }
  
  componentDidUpdate() {
    if (this.props.user.isLogged) {
      this.props.history.push('/home');
    } else {
      this.props.history.push('/login');
    }
  }
  
  render() {
    return (
      <Spinner color="primary"
          style={{
            position: "absolute",
            top: "50%",
            bottom: "50%",
            right: "50%",
            left: "50%"
          }}
        />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { checkLogin })(Index);