const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    asker: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    answer: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    vote: {
        type: Number,
        default: 0
    }
}, {
  timestamps: true
});

const Question = mongoose.model('Question', questionSchema)
module.exports = Question