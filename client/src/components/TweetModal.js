import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';

import { updateUserTweets } from '../actions/userActions';

class TweetModal extends Component {
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
        <Button color="primary" id="tweet-button" onClick={this.toggle}>
          <i className="fas fa-feather-alt"></i>
          <span> Tweet</span>
        </Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.props.toggle}
          autoFocus={false}
        >
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <ModalBody>
            <div>
              <img src={this.props.user.userData.image} alt="profile"/>
            </div>
            <Form onSubmit={e => this.handleTweet(this.state.tweet, e)}>
              <FormGroup>
                <Input
                  maxLength="280"
                  type="textarea"
                  name="tweet"
                  placeholder="What's happening ?"
                  onChange={this.handleChange}
                  autoFocus={true}
                />
                <Button disabled={this.state.tweet.length < 1} color="primary">
                  Tweet
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { updateUserTweets })(TweetModal);