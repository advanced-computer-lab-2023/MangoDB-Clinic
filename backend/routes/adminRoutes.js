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
    updatePackages,
    renderDashboard,
    getPackages
} = require('../controllers/adminController')

const {protectAdmin} = require('../middleware/adminMiddleware')

router.get('/my-info', getMyInfo)
router.get('/view-doctor/:id', viewDoctorRequest)
router.get('/view-requested-doctors', viewAllDoctorRequests)
router.get('/get-packages', getPackages)

router.get('/', renderDashboard)

router.post('/create-admin', createAdmin)
router.post('/login', loginAdmin)
router.post('/add-packages', addPackages)

router.delete('/remove-doctor/:id', removeDoctor)
router.delete('/remove-patient/:id', removePatient)
router.delete('/remove-admin/:id', removeAdmin)
router.delete('/remove-package/:id', deletePackages)

router.put('/doctor-approval/:id', doctorApproval)
router.put('/doctor-rejection/:id', doctorRejection)
router.put('/update-package/:id', updatePackages)

module.exports = router