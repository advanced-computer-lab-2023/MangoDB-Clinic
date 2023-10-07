const express = require('express')
const router = express.Router()
const {
    createAdmin,
    loginAdmin,
    removeAdmin,
    removeDoctor,
    removePatient,
    getMyInfo
} = require('../controllers/adminController')

const {checkAdminPermission, protectAdmin} = require('../middleware/adminMiddleware')

router.get('/my-info', protectAdmin, getMyInfo)

router.post('/create-admin', createAdmin)
router.post('/login', loginAdmin)

router.delete('/remove-doctor/:id', checkAdminPermission, removeDoctor)
router.delete('/remove-patient/:id', checkAdminPermission, removePatient)
router.delete('/remove-admin/:id', removeAdmin)

module.exports = router