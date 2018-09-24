var express = require('express');
var router = express.Router();
var { show, showOne, add, edit, remove, search } = require('../controllers/questionController')
var { isLogin } = require('../middlewares/isLogin')

router.get('/', show)
router.get('/:id', showOne )
router.post('/', isLogin, add)
router.put('/', isLogin, edit)
router.delete('/', isLogin, remove)
router.post('/search', search)

module.exports = router;