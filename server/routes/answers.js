var express = require('express');
var router = express.Router();
var { show, add, edit, upvote, downvote } = require('../controllers/answerController')
var { isLogin } = require('../middlewares/isLogin')

router.get('/', show)
router.post('/', isLogin, add)
router.put('/', isLogin, edit)
router.put('/upvote', isLogin, upvote)
router.put('/downvote', isLogin, downvote)

module.exports = router;