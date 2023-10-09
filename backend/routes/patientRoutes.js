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
    getFamilyMembers,
    getSelectedDoctor,
    getAllPrescriptions
} = require('../controllers/patientController')

//GET all patients
router.get('/patient/get_all_patients', getAllPatients)

//GET a single patient
router.get('/patient/get_patient/:id', getPatient)

//POST a single patient
router.post('/patient/add_patient', addPatient)

//DELETE a single patient
router.delete('/patient/delet_patient/:id', deletePatient)

//UPDATE a single patient
router.put('/patient/update_patient/:id', authenticate, updatePatient)

router.put('/patient/add_family_member/:id', addFamilyMember)

router.get('/patient/get_family_members', authenticate, getFamilyMembers)

router.get('/patient/get_selected_doctor', getSelectedDoctor)

router.get('/patient/get_all_prescriptions', authenticate, getAllPrescriptions)




module.exports = router