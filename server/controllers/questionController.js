const Question = require('../models/questionModel')

module.exports = {
    
    show: function(req, res) {
        Question.find({}, null, {})
        .populate('asker')
        .populate({
            path: 'answer',
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
        Question.updateOne({
            _id: req.body.id
        }, {
            $inc: {
                vote: 1
            }
        })
    },

    downvote: function(req, res) {
        Question.updateOne({
            _id: req.body.id
        }, {
            $inc: {
                vote: -1
            }
        })
    }
}