const express = require('express');
const Doctor = require('../models/doctorModel');
const router = express.Router();
const {
    createDoctor,
    updateEmail,
    updateHourlyRate,
    updateAffiliation,
    createPatient,
    createAppointment,
    searchPatientByName,
    viewAllPatients
} = require('../controllers/doctorController');


router.post('/CreateDoctor', createDoctor);
router.post('/CreatePatient', createPatient);
router.post('/CreateAppointment', createAppointment);



router.put('/updateEmail/:id', updateEmail);
router.put('/updateHourlyRate/:id', updateHourlyRate);
router.put('/updateAffiliation/:id', updateAffiliation);



router.get('/viewAllPatients/:id', viewAllPatients);


router.post('/searchPatientByName/:id', searchPatientByName);
module.exports = router;