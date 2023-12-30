const express = require('express')
const router = express.Router()
const {
    loginGet,
    loginPost,
    signupGet,
    signupPost,
    homeGet,
    logout
} = require('../controllers/mainController')

router.get('/login',loginGet)
      .post('/login',loginPost)
      .get('/signup',signupGet)
      .post('/signup',signupPost)
      .get('/',homeGet)
      .get('/logout',logout)

module.exports = router


