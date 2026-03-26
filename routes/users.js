const express = require('express')

const router = express.Router()

const {logInUser} = require('../controllers/userController')

router.get('/api/logInUser', logInUser)

module.exports = router;
