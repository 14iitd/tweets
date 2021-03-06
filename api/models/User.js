const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		match: /^[a-z0-9_\-]+$/
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	},
	password: {
		type: String,
		required: true
	},
	image: {
		type: String,
		default: 'https://res.cloudinary.com/amr-cloud/image/upload/v1606282532/uploads/default_ycg4dm.jpg'
	},
	tweets: [{
		type: Schema.Types.ObjectId,
		ref: 'Tweet'
	}],
	replies: [{
		type: Schema.Types.ObjectId,
		ref: 'Reply'
	}],
	likes: [{
		type: Array,
		default: []
	}],
	following: {
		type: Array,
		default: []
	},
	followers: {
		type: Array,
		default: []
	},
	followersCount: {
		type: Number,
		default: 0
	}
},
{ timestamps: true });

module.exports = mongoose.model('User', UserSchema);