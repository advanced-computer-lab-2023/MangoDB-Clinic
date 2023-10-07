const express = require('express')
const router = express.Router()

const {protect} = require('../middleware/authMiddleware')

const {
    getAllPatients,
    getPatient,
    addPatient,
    updatePatient,
    deletPatient
} = require('../controllers/patientController')

//GET all patients
router.get('/getAllPatients', getAllPatients)

//GET a single patient
router.get('/getPatient/:id', getPatient)

//POST a single patient
router.get('/addPatient', addPatient)

//DELETE a single patient
router.get('/deletePatient/:id', deletPatient)

//UPDATE a single patient
router.get('/updatePatient/:id', updatePatient)

module.exports = router