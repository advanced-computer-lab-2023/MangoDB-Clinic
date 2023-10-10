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
    doctorRejection,
    viewAllDoctorRequests,
    addPackages,
    deletePackages,
    updatePackages
} = require('../controllers/adminController')

const {protectAdmin} = require('../middleware/adminMiddleware')

router.get('/my-info', protectAdmin, getMyInfo)
router.get('/view-doctor/:id', protectAdmin, viewDoctorRequest)
router.get('/view-requested-doctors', protectAdmin, viewAllDoctorRequests)

router.post('/create-admin', createAdmin)
router.post('/login', loginAdmin)
router.post('/add-packages', protectAdmin, addPackages)

router.delete('/remove-doctor/:id', protectAdmin, removeDoctor)
router.delete('/remove-patient/:id', protectAdmin, removePatient)
router.delete('/remove-admin/:id', protectAdmin, removeAdmin)
router.delete('/remove-package/:id', protectAdmin, deletePackages)

router.put('/doctor-approval/:id', protectAdmin, doctorApproval)
router.put('/doctor-rejection/:id', protectAdmin, doctorRejection)
router.put('/update-package/:id', protectAdmin, updatePackages)

module.exports = router