const express = require('express')
const router = express.Router()

const {
    getAllPatients,
    getPatient,
    addPatient,
    updatePatient,
    deletePatient,
    addFamilyMember,
    getFamilyMembers,
    getSelectedDoctor,
    getAllPrescriptions,
    filterPrescription,
    selectPrescription,
    filterDoctors,
    searchDoctor,
    viewAllDoctors,
    getAllAppointments,
    filterAppointments,
    addAppointment,
    addPrescription,
    renderDashboard,
    renderAddFamilyMember,
    loginPatient,
    resetPassword,
    sendOTP,
    verifyOTP
} = require('../controllers/patientController')

const {protectPatient} = require('../middleware/patientMiddleware')

//Renders the patient Dashboard
router.get('/', renderDashboard)

router.get('/addFamilyMember', renderAddFamilyMember)


router.post('/login', loginPatient)
router.get('/request-otp', protectPatient, sendOTP)
router.post('/verify-otp', protectPatient, verifyOTP)
router.post('/reset-password', protectPatient, resetPassword)

//GET all patients
router.get('/get_all_patients', getAllPatients)

//GET a single patient
router.get('/get_patient/:id', getPatient)

//POST a single patient
router.post('/add_patient', addPatient)

//DELETE a single patient
router.delete('/delet_patient/:id', deletePatient)

//UPDATE a single patient
router.put('/update_patient/:id', updatePatient)

router.put('/add_family_member/:id', addFamilyMember)

router.get('/get_family_members/:id', getFamilyMembers)

router.get('/get_selected_doctor/:id', getSelectedDoctor)

//GET all prescriptions of a single patient
router.get('/get_prescriptions_of_patient/:patientId', getAllPrescriptions)

//filter prescriptions
router.get('/filter_prescription/:patientId', filterPrescription)

//select a prescription from my list of prescriptions
router.get('/select_prescription/:prescriptionId', selectPrescription)

router.get('/get_all_doctors', viewAllDoctors)

router.get('/filter_doctors', filterDoctors)

router.get('/get_all_appointments/:id', getAllAppointments)

router.get('/filter_appointments/:id', filterAppointments)

router.get('/search_doctor', searchDoctor)

// utils
router.post('/add_prescription/:id', addPrescription)
router.post('/add_appointment/:doctorId/:patientId', addAppointment)



module.exports = router