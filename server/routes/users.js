var express = require('express');
var router = express.Router();
var { login, register } = require('../controllers/userController')
var { isLogin } = require('../middlewares/isLogin')

router.post('/login', login)
router.post('/checklogin', isLogin, (req, res) => {res.status(200).json({isLogin: true})})
router.post('/register', register)

module.exports = router