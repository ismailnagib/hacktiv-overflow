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
            Question.findById(req.body.questionId)
            .then(question => {
                let answers = question.answer
                answers.push(answer._id)
                Question.updateOne({
                    _id: req.body.questionId
                }, {
                    answer: answers
                })
                .then(data => {
                    res.status(201).json({data: answer})
                })
                .catch(err => {
                    res.status(500).json({message: err})
                })
            })
            .catch(err => {
                res.status(500).json({message: err})
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

    upvote: function(req, res) {
        Answer.findById(req.body.id)
        .then(data => {
            let downvotes = data.downvote
            let upvotes = data.upvote
            let i = upvotes.indexOf(req.userId)
            if (i !== -1) {
                upvotes.splice(i, 1)
            } else {
                let j = downvotes.indexOf(req.userId)
                if (j !== -1) {
                    downvotes.splice(j, 1)
                }
                upvotes.push(req.userId)
            }
            let votes = upvotes.length - downvotes.length
            Answer.updateOne({
                _id: req.body.id
            }, {
                upvote: upvotes,
                downvote: downvotes,
                vote: votes
            })
            .then(success => {
                res.status(200).json({message: success})
            })
            .catch(err => {
                res.status(500).json({message: err})
            })
        })
    },

    downvote: function(req, res) {
        Answer.findById(req.body.id)
        .then(data => {
            let upvotes = data.upvote
            let downvotes = data.downvote
            let i = downvotes.indexOf(req.userId)
            if (i !== -1) {
                downvotes.splice(i, 1)
            } else {
                let j = upvotes.indexOf(req.userId)
                if (j !== -1) {
                    upvotes.splice(j, 1)
                }
                downvotes.push(req.userId)
            }
            let votes = upvotes.length - downvotes.length
            Answer.updateOne({
                _id: req.body.id
            }, {
                upvote: upvotes,
                downvote: downvotes,
                vote: votes
            })
            .then(success => {
                res.status(200).json({message: success})
            })
            .catch(err => {
                res.status(500).json({message: err})
            })
        })
    }
}