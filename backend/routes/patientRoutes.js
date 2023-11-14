const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { protectPatient } = require("../middleware/patientMiddleware");

const {
	getMyInfo,
	getAllPatients,
	getPatient,
	addPatient,
	updatePatient,
	deletePatient,
	addFamilyMember,
	getFamilyMembers,
	getSelectedDoctor,
	getAllPrescriptions,
	getAllPrescriptionsOfPatient,
	filterPrescription,
	selectPrescription,
	filterDoctors,
	searchDoctor,
	viewAllDoctors,
	getAllAppointments,
	filterAppointments,
	addAppointment,
	addPrescription,
	viewHealthRecords,
	viewHealthPackages,
	viewSubscribedhealthPackage,
	viewWallet,
	addDocuments,
	deleteDocument,
	linkFamilyMember,
	subscribeToHealthPackage,
	upcoming,
	filterStatus,
	payFromWallet,
	cancelHealthPackage,
	getSpecialities,
	loginPatient,
	resetPassword,
	sendOTP,
	verifyOTP,
	getAvailableAppointments,
	makeAppointment,
} = require("../controllers/patientController");

router.get("/myInfo", protectPatient, getMyInfo);

router.post("/login", loginPatient);
router.get("/request-otp", protectPatient, sendOTP);
router.post("/verify-otp", protectPatient, verifyOTP);
router.post("/reset-password", protectPatient, resetPassword);

//GET all patients
router.get("/get_all_patients", getAllPatients);

//GET a single patient
router.post("/get_patient", getPatient);

//POST a single patient
router.post("/add_patient", addPatient);

//DELETE a single patient
router.delete("/delet_patient/:id", protectPatient, deletePatient);

//UPDATE a single patient
router.put("/update_patient/:id", protectPatient, updatePatient);

router.put("/add_family_member/:id", protectPatient, addFamilyMember);

router.get("/get_family_members/:id", protectPatient, getFamilyMembers);

router.get("/get_selected_doctor/:id", protectPatient, getSelectedDoctor);

router.get("/get_all_prescriptions", protectPatient, getAllPrescriptions);

//GET all prescriptions of a single patient
router.get(
	"/get_prescriptions_of_patient/",
	protectPatient,
	getAllPrescriptionsOfPatient
);

//filter prescriptions
router.get(
	"/filter_prescription/:patientId",
	protectPatient,
	filterPrescription
);

//select a prescription from my list of prescriptions
router.get(
	"/select_prescription/:prescriptionId",
	protectPatient,
	selectPrescription
);

router.get("/get_all_doctors/:id", protectPatient, viewAllDoctors);

router.get("/filter_doctors/:id", protectPatient, filterDoctors);

router.get("/get_all_appointments/:id", protectPatient, getAllAppointments);

router.get("/filter_appointments/:id", protectPatient, filterAppointments);

router.get("/search_doctor/:id", protectPatient, searchDoctor);

router.get("/view_health_records/:id", protectPatient, viewHealthRecords);

router.get("/view_health_packages", viewHealthPackages);

router.get(
	"/view_subscribed_health_package/:id",
	protectPatient,
	viewSubscribedhealthPackage
);

router.put("/cancel_health_package/:id", protectPatient, cancelHealthPackage);

router.get("/view_wallet/:id", protectPatient, viewWallet);

router.put(
	"/add_documents/:id",
	protectPatient,
	upload.array("document"),
	addDocuments
);

router.delete(
	"/delete_document/:patientId/:documentId",
	protectPatient,
	deleteDocument
);

router.put("/link_family_member/:id", protectPatient, linkFamilyMember);

router.put(
	"/subscribe_to_health_package/:patientId/:packageId",
	protectPatient,
	subscribeToHealthPackage
);

// utils
router.post(
	"/add_prescription/:doctorId/:patientId",
	protectPatient,
	addPrescription
);
router.post(
	"/add_appointment/:doctorId/:patientId",
	protectPatient,
	addAppointment
);
router.get("/get_specialities", getSpecialities);
router.get("/getAvailableAppointments", getAvailableAppointments);

router.get(
	"/get_available_appointments/:id",
	protectPatient,
	getAvailableAppointments
);

router.post("/make_appointment", protectPatient, makeAppointment);

router.post("/upcoming", upcoming);

router.post("/filterapp", protectPatient, filterStatus);

router.post("/payFromWallet/:appointmentId", protectPatient, payFromWallet);

module.exports = router;
