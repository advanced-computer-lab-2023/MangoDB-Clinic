const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const {protectDoctor} = require('../middleware/doctorMiddleware')

const {
    getMyInfo,
    createDoctor,
    updateEmail,
    updateHourlyRate,
    updateAffiliation,
    createPatient,
    createAppointment,
    viewAllPatients,
    getDoctors,
    filterStatus,
    upcoming,
    selectPatient,
    getPatients,
    viewHealthRecords,
    searchPatientByName,
    getAllSpecialities,
    viewWallet,
    addNewSlots,
    getMyAppointments,
    followUpDoc,
    addHealthRecord,
    viewEmploymentContract,
    getDoctorInfo,
    loginDoctor,
    resetPassword,
    sendOTP,
    verifyOTP,
    followUp,
    getStatusOptions,
} = require('../controllers/doctorController');

router.get('/myInfo', protectDoctor, getMyInfo);

// Extra frontend routes
router.get('/doctorInfo/:id', getDoctorInfo);
router.get('/statusOptions', getStatusOptions);

router.post('/login', loginDoctor)
router.post('/verify-otp', protectDoctor, verifyOTP)
router.post('/reset-password', protectDoctor, resetPassword)
router.get('/request-otp', protectDoctor, sendOTP)

router.post('/filterapp', filterStatus);

router.post('/upcoming', upcoming)

router.post('/CreateDoctor', createDoctor);
router.post('/CreatePatient', createPatient);
router.post('/CreateAppointment', createAppointment);
router.get('/getdoctors', getDoctors);
router.get('/getPatients', getPatients);
// router.get('/filterapp/:id', filterStatus);
// router.get('/upcoming/:id', upcoming);
router.get('/selectedPatient/:id', async (req, res) => {
    try {
        const patientId = req.params.id;
        const patient = await selectPatient(patientId);
        if (!patient) {

            console.error('Patient not found for ID:', patientId);

        }
        // res.render('selectedPatient', { patient });
        res.json(patient);
    } catch (error) {

        console.error('Error retrieving patient:', error);

    }
});
router.get('/viewAllPatients/:doctorId', async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const patientsData = await viewAllPatients(doctorId);

        res.json(patientsData);
        // if (patientsData && patientsData.length > 0) {
        //     res.render('viewAllPatients', { patients: patientsData });
        // } else {
        //     res.status(404).json({ message: 'No patients found' });
        // }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving patients' });
    }
});

router.put('/updateEmail/:id',protectDoctor, updateEmail);
router.put('/updateHourlyRate/:id',protectDoctor, updateHourlyRate);
router.put('/updateAffiliation/:id',protectDoctor, updateAffiliation);

router.post('/searchPatientByName/:id',protectDoctor, searchPatientByName);
// sync (req, res) => {
//     const doctorId = req.params.id;
//     const firstName = req.body.firstName; 

//     try {
//       
//         const patients = await doctorController.searchPatientByName(doctorId, firstName);
//         res.render('searchByName', { patients: patients || [] });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Something went wrong' });
//     }
// });
// router.get('/searchPatientByName/:id', async (req, res) => {
//     try {
//         const doctorId = req.params.doctorId;
//         const patientData = await doctorController.searchPatientByName(doctorId);

//         if (patientsData && patientsData.length > 0) {
//             res.render('searchByName', { patient: patientsData });
//         } else {
//             res.status(404).json({ message: 'No patient found' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error retrieving patient' });
//     }
// });
router.post('/viewHealthRecords/:id',protectDoctor, viewHealthRecords);

router.get('/getAllSpecialities', getAllSpecialities)

router.get('/view_wallet/:id',protectDoctor, viewWallet)
router.post('/followUp',protectDoctor, followUpDoc);
router.get('/getMyAppointments/:id',protectDoctor,getMyAppointments)
router.get('/getEmploymentContract',protectDoctor,viewEmploymentContract)
router.patch('/addSlots/:id',protectDoctor, addNewSlots);
router.patch('/addHealthRecord/:id',protectDoctor, addHealthRecord);
router.patch('scheduleFollowup/:id',protectDoctor, followUp)

module.exports = router;

