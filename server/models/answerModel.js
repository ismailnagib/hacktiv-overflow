const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    giver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    upvote: {
        type: Array,
        default: []
    },
    downvote: {
        type: Array,
        default: []
    },
    vote: {
        type: Number,
        default: 0
    }
}, {
  timestamps: true
});

const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer