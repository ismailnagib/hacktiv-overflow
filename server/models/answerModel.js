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
    vote: {
        type: Number,
        default: 0
    }
}, {
  timestamps: true
});

const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer