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

const {protectAdmin} = require('../middleware/adminMiddleware')

router.get('/my-info', protectAdmin, getMyInfo)

router.post('/create-admin', protectAdmin, createAdmin)
router.post('/login', loginAdmin)

router.delete('/remove-doctor/:id', protectAdmin, removeDoctor)
router.delete('/remove-patient/:id', protectAdmin, removePatient)
router.delete('/remove-admin/:id', protectAdmin, removeAdmin)

module.exports = router