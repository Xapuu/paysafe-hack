const express = require('express')

const controlers = require('./../../controlers')
const authC = require('./../passprot')

const router = express.Router()

router.post('/login', controlers.login)

router.post('/register', controlers.register)

router.get('/demo', authC.authenticate(), controlers.demo)

module.exports = router
