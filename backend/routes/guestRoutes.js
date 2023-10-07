const express = require('express')
const router = express.Router()
const {registerAsPatient, registerAsDoctor, login} = require('../controllers/guestController.js')

const authenticate = require('../middleware/authMiddleware.js')


router.post('/patientRegistration', registerAsPatient)
router.post('/doctorRegistration', registerAsDoctor)
router.post('/login', authenticate, login)


module.exports = router