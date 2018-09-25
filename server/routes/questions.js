var express = require('express');
var router = express.Router();
var { show, showOne, add, edit, remove, search, upvote, downvote } = require('../controllers/questionController')
var { isLogin } = require('../middlewares/isLogin')

router.get('/sort/:sort', show)
router.get('/:id', showOne )
router.post('/', isLogin, add)
router.put('/', isLogin, edit)
router.delete('/', isLogin, remove)
router.post('/search', search)
router.put('/upvote', isLogin, upvote)
router.put('/downvote', isLogin, downvote)

module.exports = router;