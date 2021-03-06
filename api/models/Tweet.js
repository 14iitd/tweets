const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TweetSchema = new Schema({
	content: {
		type: String,
		required: true
	},
	likers: {
		type: Array,
		default: []
  },
  likes: {
    type: Number,
    default: 0
  },
  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Reply'
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
{ timestamps: true });

module.exports = mongoose.model('Tweet', TweetSchema);