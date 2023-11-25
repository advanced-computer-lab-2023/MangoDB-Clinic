const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");
const { protectDoctor } = require("../middleware/doctorMiddleware");

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
	getDoctor,
	getStatusOptions,
	changePassword,
	rescheduleApp,
	cancelApp,
	addOrUpdateDosage,
	viewPrescriptionsByDoctor,
	addPrescription,
	acceptFollowUpSession,
	revokeFollowUpSession,
} = require("../controllers/doctorController");

router.get("/myInfo", protectDoctor, getMyInfo);

// Extra frontend routes
router.get("/doctorInfo", protectDoctor, getDoctorInfo);
router.get("/statusOptions", getStatusOptions);

router.post("/login", loginDoctor);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.post("/request-otp", sendOTP);
router.post("/change-password", protectDoctor, changePassword);

router.post("/filterapp", protectDoctor, filterStatus);

router.post("/get_doctor", getDoctor);
 
router.post("/acceptFollowUpSession/:id", acceptFollowUpSession);
router.post("/revokeFollowUpSession/:id", revokeFollowUpSession);

// router.post("/upcoming", upcoming);
router.post("/upcoming", protectDoctor, upcoming);

router.post("/CreateDoctor", createDoctor);
router.post("/CreatePatient", createPatient);
router.post("/CreateAppointment", createAppointment);
router.get("/getdoctors", getDoctors);
router.get("/getPatients", getPatients);
// router.get('/filterapp/:id', filterStatus);
// router.get('/upcoming/:id', upcoming);
router.get("/selectedPatient/:id", protectDoctor, async (req, res) => {
	try {
		const patientId = req.params.id;
		const patient = await selectPatient(patientId);
		if (!patient) {
			console.error("Patient not found for ID:", patientId);
		}
		// res.render('selectedPatient', { patient });
		res.json(patient);
	} catch (error) {
		console.error("Error retrieving patient:", error);
	}
});
router.get("/viewAllPatients", protectDoctor, async (req, res) => {
	try {
		// const doctorId = req.params.doctorId;
		const doctorId = req.user._id;
		const patientsData = await viewAllPatients(doctorId);

		res.json(patientsData);
		// if (patientsData && patientsData.length > 0) {
		//     res.render('viewAllPatients', { patients: patientsData });
		// } else {
		//     res.status(404).json({ message: 'No patients found' });
		// }
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error retrieving patients" });
	}
});

// router.put("/updateEmail/:id", updateEmail);
// router.put("/updateHourlyRate/:id", updateHourlyRate);
// router.put("/updateAffiliation/:id", updateAffiliation);
router.put("/updateEmail", protectDoctor, updateEmail);
router.put("/updateHourlyRate", protectDoctor, updateHourlyRate);
router.put("/updateAffiliation", protectDoctor, updateAffiliation);

router.post("/searchPatientByName", protectDoctor, searchPatientByName);
router.post("/viewHealthRecords", viewHealthRecords);

router.get("/getAllSpecialities", getAllSpecialities);

router.get("/view_wallet", protectDoctor, viewWallet);
router.post("/followUp/:id", followUpDoc);

// router.get("/getMyAppointments/:id", getMyAppointments);
// router.get("/getEmploymentContract:id", viewEmploymentContract);
// router.patch("/addSlots/:id", addNewSlots);
// router.patch("/addHealthRecord/:id", addHealthRecord);
router.get("/getMyAppointments", protectDoctor, getMyAppointments);
router.get("/getEmploymentContract", protectDoctor, viewEmploymentContract);
router.patch("/addSlots", protectDoctor, addNewSlots);
router.patch("/addHealthRecord/:id", protectDoctor, addHealthRecord);
router.patch(
	// "/scheduleFollowup/:doctorId/:patientId/:appointmentId/:followUpDate",
	"/scheduleFollowup/:patientId/:appointmentId/:followUpDate",

	followUp
);

router.patch("/rescheduleApp", protectDoctor, rescheduleApp);
router.delete("/cancelApp", protectDoctor, cancelApp);

router.get(
	"/viewAllPrescriptionsByDoctor",
	protectDoctor,
	viewPrescriptionsByDoctor
);
router.post("/addPrescription", protectDoctor, addPrescription);
router.put("/addOrUpdateDosage", addOrUpdateDosage);

module.exports = router;
