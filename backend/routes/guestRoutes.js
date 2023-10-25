const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload');
const { registerAsPatient, registerAsDoctor, login, renderPatientRegistration, renderDoctorRegistration } = require('../controllers/guestController.js')

const authenticate = require('../middleware/authMiddleware.js')

router.get('/patientRegistration', renderPatientRegistration)

router.get('/doctorRegistration', renderDoctorRegistration)



router.post('/patientRegistration', registerAsPatient)
router.post('/doctorRegistration', upload.array('document[]'), registerAsDoctor)
router.post('/login', login)


module.exports = router