var express = require('express');
var router = express.Router();
var { show, add, edit } = require('../controllers/answerController')
var { isLogin } = require('../middlewares/isLogin')

router.get('/', show)
router.post('/', isLogin, add)
router.put('/', isLogin, edit)

module.exports = router;