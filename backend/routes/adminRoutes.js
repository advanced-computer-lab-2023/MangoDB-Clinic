const express = require('express')
const router = express.Router()
const {
    createAdmin,
    loginAdmin,
    removeAdmin,
    removeDoctor,
    removePatient,
    getMyInfo,
    viewDoctorRequest,
    doctorApproval,
    doctorRejection
} = require('../controllers/adminController')

const {protectAdmin} = require('../middleware/adminMiddleware')

router.get('/my-info', protectAdmin, getMyInfo)
router.get('/view-doctor/:id', viewDoctorRequest)

router.post('/create-admin', protectAdmin, createAdmin)
router.post('/login', loginAdmin)

router.delete('/remove-doctor/:id', removeDoctor)
router.delete('/remove-patient/:id', protectAdmin, removePatient)
router.delete('/remove-admin/:id', protectAdmin, removeAdmin)

router.put('/doctor-approval/:id', doctorApproval)
router.put('/doctor-rejection/:id', doctorRejection)

module.exports = router