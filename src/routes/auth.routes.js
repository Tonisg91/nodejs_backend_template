const router = require('express').Router()
const { authC } = require('../controllers')

// POST Signup
router.post('/signup', authC.postSignup)

// POST Login
router.post('/login', authC.postLogin)

module.exports = router
