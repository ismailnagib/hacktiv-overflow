const Question = require('../models/questionModel')

module.exports = {
    
    show: function(req, res) {
        Question.find({}, null, {
            sort: {
                [req.params.sort]: 'DESC'
            }
        })
        .populate('asker')
        .populate({
            path: 'answer',
            options: {
                sort: {
                    vote: 'DESC'
                }
            },
            populate: {path: 'giver'}
        })
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    showOne: function(req, res) {
        Question.findById(req.params.id)
        .populate('asker')
        .populate({
            path: 'answer',
            options: {
                sort: {
                    vote: 'DESC'
                }
            },
            populate: {path: 'giver'}
        })
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    add: function(req, res) {
        Question.create({
            title: req.body.title,
            content: req.body.content,
            asker: req.userId
        })
        .then(data => {
            res.status(201).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    edit: function(req, res) {
        Question.updateOne({
            _id: req.body.id,
            asker: req.userId
        }, {
            title: req.body.title,
            content: req.body.content
        })
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    remove: function(req, res) {
        Question.deleteOne({
            _id: req.body.id,
            asker: req.userId 
        })
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    search: function(req, res) {
        Question.find({
            title: new RegExp('\S*'+req.body.keyword+'\S*','i')
        })
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
    },

    upvote: function(req, res) {
        Question.findById(req.body.id)
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
            Question.updateOne({
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
        Question.findById(req.body.id)
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
            Question.updateOne({
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