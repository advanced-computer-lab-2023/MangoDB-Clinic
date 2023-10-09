const express = require('express')
const router = express.Router()
const {registerDoctor} = require('../controllers/guestController')

router.post('/register-doctor', registerDoctor)

module.exports = router