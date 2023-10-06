const express = require('express')
const router = express.Router()

const {protect} = require('../middleware/authMiddleware')

module.exports = router