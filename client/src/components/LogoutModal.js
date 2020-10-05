import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';

import { updateUserTweets } from '../actions/userActions';

class LogoutModal extends Component {
  constructor(props) {
    super();
    this.state = {
      modal: false,
      tweet: ''
    }
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTweet = this.handleTweet.bind(this);
  }

  handleTweet (tweet, e) {
		e.preventDefault();

    const newTweet = {
      content: tweet,
      author: this.props.user.userData._id
    }

    axios({
			method: 'post',
			url: `/api/tweet/`,
			headers: {
				Authorization: `Bearer ${localStorage.getItem('userToken')}`
			},
			data: newTweet
		})
			.then(res => {
          this.toggle();
					this.props.updateUserTweets(res.data.tweet);
				})
			.catch(err => { console.log(err); });
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <Button style={{ margin: "15px auto" }} color="primary" onClick={this.toggle}>
          <i className="fa fa-fw fa-sign-out"></i>
          <span> Log out</span>
        </Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.props.toggle}
          autoFocus={false}
        >
          <ModalHeader style={{ display: "none" }}></ModalHeader>
          <ModalBody style={{ display: "flex", 
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around"
            }}>
            <h2 style={{ margin: "3% auto" }}>Log out of Tweets ?</h2>
            <div style={{ width: "100%", textAlign: "center" }}>
              <Button onClick={this.toggle} style={{ margin: "3%" }}>Cancel</Button>
              <Button onClick={this.props.handleLogout} style={{ margin: "3%" }} color="primary" 
                autoFocus={true}>Log out
              </Button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { updateUserTweets })(LogoutModal);