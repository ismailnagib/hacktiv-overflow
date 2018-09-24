const Answer = require('../models/answerModel')
const Question = require('../models/questionModel')

module.exports = {
    
    show: function(req, res) {
        Answer.find({})
        .populate('giver')
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    add: function(req, res) {
        Answer.create({
            content: req.body.content,
            giver: req.userId
        })
        .then(answer => {
            Question.findById(req.body.postId)
            .then(question => {
                let answers = question.answer
                answers.push(answer._id)
                Question.updateOne({
                    _id: req.body.postId
                }, {
                    answers: answers
                })
                .then(data => {
                    res.status(201).json({data: answer})
                })
                .catch(err => {
                    res.status(500).json({message: err})
                })
            })
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    edit: function(req, res) {
        Answer.updateOne({
            _id: req.body.id,
            giver: req.userId
        }, {
            content: req.body.content
        })
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },
}