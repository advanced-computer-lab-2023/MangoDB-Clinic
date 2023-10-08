const express = require('express')
const router = express.Router()

const authenticate = require('../middleware/authMiddleware.js')

const {
    getAllPatients,
    getPatient,
    addPatient,
    updatePatient,
    deletePatient,
    addFamilyMember,
    getFamilyMembers
} = require('../controllers/patientController')

//GET all patients
router.get('/getAllPatients', getAllPatients)

//GET a single patient
router.get('/getPatient/:id', getPatient)

//POST a single patient
router.get('/addPatient', addPatient)

//DELETE a single patient
router.get('/deletePatient/:id', deletePatient)

//UPDATE a single patient
router.get('/updatePatient/:id', updatePatient)

router.put('/addFamilyMember/:id', addFamilyMember)

router.get('/getFamilyMembers', authenticate, getFamilyMembers)


module.exports = router