import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Alert, FormGroup, Input, Button, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { checkLogin } from '../actions/userActions';

class Signup extends Component {
	constructor(props) {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
			alert: false,
			isLoading: false,
			errors: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ isLoading: true });
		let { name, email, password, password2 } = this.state;
		name = name.toLowerCase();

		axios({
			method: "post",
			url: "/api/user/signup",
			data: { name, email, password, password2 }
		})
			.then(() => {
				this.props.history.push({ pathname: '/login', state: { flash: true } });
			})
			.catch(err => {
				let errors = [];

				if (err.response.status === 400) {
					errors = err.response.data.message;
				} else if (err.response.status === 409) {
					errors = [err.response.data.message];
				}

				this.setState({ alert: true, errors, isLoading: false });
			});
	}

	handleChange(e) {
		// Get form data and change state
		const targetName = e.target.getAttribute('name');
		const newState = {};
		newState[targetName] = e.target.value;
		this.setState(newState);
	}

	render() {
		return (
			<main className="credentials">
				<div className="form-container">
					<h1><i className="fa fa-twitter"></i> tweets</h1>
					<Form onSubmit={this.handleSubmit} noValidate>
						{this.state.errors.map((error, i) =>
							<Alert key={i} isOpen={this.state.alert} color="danger">
								{error + '!'}
							</Alert>)
						}
						<FormGroup>
							<Input type="text" maxLength="8" name="name" onChange={this.handleChange} 
								value={this.state.name} placeholder="Username" autoFocus autoComplete="off"/>
						</FormGroup>
						<FormGroup>
							<Input type="email" name="email" onChange={this.handleChange} 
								value={this.state.email} placeholder="Email" autoComplete="off"/>
						</FormGroup>
						<FormGroup>
							<Input type="password" name="password" onChange={this.handleChange} 
								value={this.state.password} placeholder="Password" autoComplete="off"/>
						</FormGroup>
						<FormGroup>
							<Input type="password" name="password2" onChange={this.handleChange} 
								value={this.state.password2} placeholder="Confirm Password" autoComplete="off"/>
						</FormGroup>
						<Button color="primary" size="md">
							{(this.state.isLoading) ?
								<Spinner color="light" />
								: <span>Sign up</span>}
						</Button>
					</Form>
					<p>Have an account? <Link to="/login">Log in</Link></p>
					</div>
			</main>
		);
	}
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { checkLogin })(Signup);
