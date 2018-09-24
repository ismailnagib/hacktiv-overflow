var User = require('../models/userModel')
var jwt = require('jsonwebtoken');

module.exports = {
  isLogin: function(req, res, next) {
    let token = req.body.token
    if(!token) {
      res.status(401).json({ message: 'token was not inputed' })
    } else {
      var decoded = jwt.verify(token, process.env.JWT_KEY);
      User.findOne({
        email: decoded.email
      }, function(err, user) {
        if(user) {
          req.userId = user._id
          next()
        } else {
          res.status(401).json({
            error: 'invalid token'
          })
        }
      })
    }
  }
}
