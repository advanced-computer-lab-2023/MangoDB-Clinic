const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload');
const { registerAsPatient, registerAsDoctor, login, renderPatientRegistration, renderDoctorRegistration, getType } = require('../controllers/guestController.js')

const authenticate = require('../middleware/authMiddleware.js')

// router.get('/patientRegistration', renderPatientRegistration)

router.get('/doctorRegistration', renderDoctorRegistration)



router.post('/patientRegistration', registerAsPatient)
router.post('/doctorRegistration', upload.array('documents'), registerAsDoctor)
router.post('/login', login)
router.get('/getType', authenticate, getType)


module.exports = router